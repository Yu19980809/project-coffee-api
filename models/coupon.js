import mongoose from 'mongoose'

const couponSchema = new mongoose.Schema({
  name: {type: String, require: true},
  value: Number,
  start_date: String,
  end_date: String,
  status: {type: String, default: 'off'}
}, {timestamps: true})

export default mongoose.model('Coupon', couponSchema)
