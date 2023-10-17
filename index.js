import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'

import authRoutes from './routes/auth.js'
import shopRoutes from './routes/shop.js'
import categoryRoutes from './routes/category.js'
import commodityRoutes from './routes/commodity.js'
import orderRoutes from './routes/order.js'
import orderCommodityRoutes from './routes/orderCommodity.js'
import groupRoutes from './routes/group.js'
import couponRoutes from './routes/coupon.js'
import memberRoutes from './routes/member.js'
import userRoutes from './routes/user.js'
import addressRoutes from './routes/address.js'
import aliyunRoutes from './routes/aliyun.js'

// config
dotenv.config()

// init app
const app = express()

// middleware
app.use(cors())
app.use(bodyParser.json({limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))

// routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/shop', shopRoutes)
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/commodity', commodityRoutes)
app.use('/api/v1/order', orderRoutes)
app.use('/api/v1/group', groupRoutes)
app.use('/api/v1/coupon', couponRoutes)
app.use('/api/v1/member', memberRoutes)
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/address', addressRoutes)
app.use('/api/v1/aliyun', aliyunRoutes)
app.use('/api/v1/order-commodity', orderCommodityRoutes)

// mongodb
mongoose.set('strictQuery', true)
mongoose.connect('mongodb://127.0.0.1:27017/coffee')
  .then(() => {
    console.log('Connected to mongodb')
    app.listen(4000, () => console.log('Server running on port 4000'))
  })
  .catch(error => console.log('Fail to connect mongodb', error))
