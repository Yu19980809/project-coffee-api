import mongoose from 'mongoose'

const memberSchema = new mongoose.Schema({
  name: {type: String, require: true},
  tel: {type: String, require: true},
  address: {type: String, require: true},
  password: {type: String, require: true},
  role: {type: String, default: 'salesclerk'},
  shop_id: mongoose.Schema.Types.ObjectId
}, {timestamps: true})

export default mongoose.model('Member', memberSchema)
