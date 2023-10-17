import mongoose from 'mongoose'

const orderCommoditySchema = new mongoose.Schema({
  count: {type: Number, require: true},
  price: {type: Number, require: true},
  temperature: {type: String, default: '正常冰'},
  sugar: {type: String, default: '标准糖'},
  addon: {type: Array, default: []},
  addon_price: {type: Number, default: 0},
  total_price: {type: Number, default: 0},
  checked: {type: Boolean, default: true},
  commodity_id: mongoose.Schema.Types.ObjectId,
  order_id: mongoose.Schema.Types.ObjectId
}, {timestamps: true})

export default mongoose.model('OrderCommodity', orderCommoditySchema)
