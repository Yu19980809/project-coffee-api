import express from 'express'
import { verifyAccessToken } from '../utils/jwt.js'
import {
  generateOrderCommodities,
  fetchOrderCommodities
} from '../controlllers/orderCommodity.js'

const router = express.Router()

// WEAPP
router.post('/weapp', verifyAccessToken, generateOrderCommodities)
router.get('/weapp', verifyAccessToken, fetchOrderCommodities)

export default router
