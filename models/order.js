import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  count: {type: Number, require: true},
  price: {type: Number, require: true},
  type: {type: String, default: '自取'},
  status: {type: String, default: '制作中'},
  payment: {type: String, default: '账户余额'},
  note: {type: String, default: ''},
  address: Object,
  shop_id: mongoose.Schema.Types.ObjectId,
  user_id: mongoose.Schema.Types.ObjectId
}, {timestamps: true})

export default mongoose.model('Order', orderSchema)
