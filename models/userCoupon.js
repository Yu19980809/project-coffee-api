import mongoose from 'mongoose'

const userCouponSchema = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  coupon_id: mongoose.Schema.Types.ObjectId
}, {timestamps: true})

export default mongoose.model('UserCoupon', userCouponSchema)
