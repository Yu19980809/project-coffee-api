import mongoose from 'mongoose'

const addressSchema = new mongoose.Schema({
  location: {type: String, require: true},
  door: {type: String, require: true},
  name: {type: String, require: true},
  tel: {type: String, require: true},
  is_default: {type: String, default: 'no'},
  user_id: mongoose.Schema.Types.ObjectId
}, {timestamps: true})

export default mongoose.model('Address', addressSchema)
