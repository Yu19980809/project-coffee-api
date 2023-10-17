import express from 'express'
import { verifyAccessToken } from '../utils/jwt.js'
import {
  deleteOrder,
  deleteOrders,
  fetchAllOrders,
  doneOrder,
  generateOrder
} from '../controlllers/order.js'

const router = express.Router()

// WEB
router.get('/web', fetchAllOrders)
router.delete('/web/:id', deleteOrder)
router.delete('/web/', deleteOrders)
router.patch('/web/:id', doneOrder)

// WEAPP
router.post('/weapp', verifyAccessToken, generateOrder)

export default router
