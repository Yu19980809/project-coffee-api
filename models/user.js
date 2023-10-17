import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  open_id: {type: String, require: true},
  name: String,
  tel: String,
  avatar: String,
  money: {type: Number, default: 0},
  is_vip: {type: String, default: 'no'},
  vip_start_date: String,
  vip_end_date: String
}, {timestamps: true})

export default mongoose.model('User', userSchema)
