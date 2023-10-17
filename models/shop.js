import mongoose from 'mongoose'

const shopSchema = new mongoose.Schema({
  name: {type: String, require: true},
  location: {type: String, require: true}
}, {timestamps: true})

export default mongoose.model('Shop', shopSchema)
