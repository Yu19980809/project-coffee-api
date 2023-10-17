import mongoose from 'mongoose'

const groupSchema = new mongoose.Schema({
  name: {type: String, require: true},
  user_count: {type: Number, default: 0}
}, {timestamps: true})

export default mongoose.model('Group', groupSchema)
