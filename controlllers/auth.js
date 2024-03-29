import jwt from 'jsonwebtoken'
import request from 'request'
import Member from '../models/member.js'
import User from '../models/user.js'
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken
} from '../utils/jwt.js'

export const loginWeb = async (req, res) => {
  try {
    const {tel, password} = req.body
    
    // check if user already exist
    const user = await Member.findOne({tel})
    if (!user) {
      return res.status(401).json({message: 'Invalid tel or password'})
    }

    // check password
    if (user.password !== password) {
      return res.status(401).json({message: 'Wrong password'})
    }

    // generate a token
    const secretKey = process.env.TOKEN_SECRET
    const token = jwt.sign({userId: user._id}, secretKey)

    res.status(200).json({user, token})
  } catch (error) {
    console.log('Login error', error)
    res.status(500).json({message: 'Login failed'})
  }
}

export const loginWeapp = async (req, res) => {
  try {
    const {code} = req.body
    const openId = await fetchWxOpenId(code)

    // check if user already exists
    const user = await User.findOne({open_id: openId})
    if (!user) return createUser(openId, res)

    const accessToken = await signAccessToken(user._id)
    const refreshToken = await signRefreshToken(user._id)
    res.status(200).json({isNew: false, user, accessToken, refreshToken})
  } catch (error) {
    console.log('Failed to login', error)
    res.status(500).json({message: 'Failed to login'})
  }
}

const fetchWxOpenId = code => new Promise((resolve, reject) => {
  const appId = process.env.APP_ID
  const appSecret = process.env.APP_SECRET
  const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${ appId }&secret=${ appSecret }&js_code=${ code }&grant_type=authorization_code`

  request(url, (error, response, body) => resolve(JSON.parse(body)['openid']))
})

const createUser = async (openId, res) => {
  try {
    const user = await User.create({open_id: openId})
    const accessToken = await signAccessToken(user._id)
    const refreshToken = await signRefreshToken(user._id)
    res.status(200).json({isNew: true, user, accessToken, refreshToken})
  } catch (error) {
    console.log('Failed to create user according to the openId', error)
    res.status(500).json({message: 'Failed to create user'})
  }
}

export const refreshToken = async (req, res) => {
  try {
    const {refreshToken} = req.body
    if (!refreshToken) {
      return res.status(500).json({message: 'No refresh token provided'})
    }

    const userId = await verifyRefreshToken(refreshToken)
    const accessToken = await signAccessToken(userId)
    const newRefreshToken = await signRefreshToken(userId)
    res.status(200).json({accessToken, refreshToken: newRefreshToken})
  } catch (error) {
    console.log('Failed to refresh token', error)
    res.status(500).json({message: 'Failed to refresh token'})
  }
}
