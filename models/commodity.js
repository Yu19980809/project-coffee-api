import mongoose from 'mongoose'

const commoditySchema = new mongoose.Schema({
  name: {type: String, require: true},
  sales: {type: Number, default: 0},
  price: {type: Number, require: true},
  image: {type: String, default: 'https://nhsoft-persistent-1251937768.cos.ap-shanghai.myqcloud.com/mars-file/818849308107317249/ed22e738-1f34-4703-9b15-f33da1f173dc/经典冰美式.jpg'},
  status: {type: String, default: 'on'},
  category_id: mongoose.Schema.Types.ObjectId
}, {timestamps: true})

export default mongoose.model('Commodity', commoditySchema)
