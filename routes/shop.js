import express from 'express'
import {
  addShop,
  fetchNearestShop,
  fetchAllShops
} from '../controlllers/shop.js'

const router = express.Router()

// WEB
router.post('/web', addShop)

// WEAPP
router.get('/weapp/nearest', fetchNearestShop)
router.get('/weapp', fetchAllShops)

export default router
