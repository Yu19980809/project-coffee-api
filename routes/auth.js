import express from 'express'
import { loginWeb, loginWeapp, refreshToken } from '../controlllers/auth.js'

const router = express.Router()

// WEB
router.post('/login/web', loginWeb)

// WEAPP
router.post('/login/weapp', loginWeapp)
router.post('/refresh-token/weapp', refreshToken)

export default router
