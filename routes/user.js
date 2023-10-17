import express from 'express'
import { verifyAccessToken } from '../utils/jwt.js'
import {
  fetchAllUsers,
  giveVip,
  giveCoupon,
  setUsersGroup,
  updateUserInfo
} from '../controlllers/user.js'

const router = express.Router()

// WEB
router.get('/web', fetchAllUsers)
router.patch('/web/vip', giveVip)
router.patch('/web/coupon', giveCoupon)
router.patch('/web/group', setUsersGroup)

// WEAPP
router.patch('/weapp', verifyAccessToken, updateUserInfo)

export default router
