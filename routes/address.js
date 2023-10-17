import express from 'express'
import { verifyAccessToken } from '../utils/jwt.js'
import {
  fetchUserAddresses,
  fetchUserDefaultAddress,
  addAddress,
  fetchAddressInfo,
  updateAddressInfo
} from '../controlllers/address.js'

const router = express.Router()

router.get('/weapp', verifyAccessToken, fetchUserAddresses)
router.get('/weapp/default', verifyAccessToken, fetchUserDefaultAddress)
router.post('/weapp', verifyAccessToken, addAddress)
router.get('/weapp/:id', fetchAddressInfo)
router.patch('/weapp', updateAddressInfo)

export default router
