import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
  name: {type: String, require: true},
  commodity_count: {type: Number, default: 0},
  status: {type: String, default: 'on'},
  type: {type: String, require: true}
}, {timestamps: true})

export default mongoose.model('Category', categorySchema)
