import express from 'express'
import {
  addCoupon,
  deleteCoupon,
  deleteCoupons,
  editCoupon,
  fetchAllCoupons,
  fetchAllOnCoupons,
  offCoupon,
  offCoupons,
  onCoupon
} from '../controlllers/coupon.js'

const router = express.Router()

router.get('/web', fetchAllCoupons)
router.get('/web', fetchAllOnCoupons)
router.patch('/web/on/:id', onCoupon)
router.patch('/web/off_single/:id', offCoupon)
router.patch('/web/off_multiple', offCoupons)
router.post('/web', addCoupon)
router.patch('/web', editCoupon)
router.delete('/web/:id', deleteCoupon)
router.delete('/web', deleteCoupons)

export default router