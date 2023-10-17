import Order from '../models/order.js'
import OrderCommodity from '../models/orderCommodity.js'
import Shop from '../models/shop.js'
import User from '../models/user.js'
import { generateOrderCommodities } from './orderCommodity.js'
import { countCommodities } from './commodity.js'
import { fetchCommodities } from './orderCommodity.js'

// WEB
const fetchAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({createdAt: -1})
    const len = orders.length
    let newOrders = []

    for (let i = 0; i < len; i++) {
      const order = orders[i]
      const shop = await Shop.findById(order.shop_id)
      const user = await User.findById(order.user_id)
      const orderCommodities = await OrderCommodity.find({order_id: order._id})
      const commodities = await fetchCommodities(orderCommodities)
      const obj = {
        _id: order._id,
        count: order.count,
        price: order.price,
        payment: order.payment,
        note: order.note,
        address: JSON.parse(order.address),
        type: order.type,
        status: order.status,
        shop,
        user,
        commodities,
        createdAt: order.createdAt
      }
      newOrders.push(obj)

      if (i === len - 1) res.status(200).json({data: newOrders})
    }
  } catch (error) {
    console.log('Failed to  fetch all orders', error)
    res.status(500).json({message: 'Failed to fetch all orders'})
  }
}

const deleteOrder = async (req, res) => {
  try {
    const {id} = req.params
    await OrderCommodity.deleteMany({order_id: id})
    await Order.findByIdAndDelete(id)
    res.status(200).json({message: 'Delete current order successfully'})
  } catch (error) {
    console.log('Failed to delete current order', error)
    res.status(500).json({message: 'Faied to delete current order'})
  }
}

const deleteOrders = async (req, res) => {
  try {
    const {idList} = req.query
    const len = idList.length

    for (let i = 0; i < len; i++) {
      const orderId = idList[i]
      await OrderCommodity.deleteMany({order_id: orderId})
      await Order.findByIdAndDelete(orderId)

      if (i === len -1) {
        res.status(200).json({message: 'Delete these orders successfully'})
      }
    }
  } catch (error) {
    console.log('Failed to delete these orders', error)
    res.status(500).json({message: 'Failed to delete these orders'})
  }
}

const doneOrder = async (req, res) => {
  try {
    const {id} = req.params
    await Order.findByIdAndUpdate(id, {status: '已完成'})
    res.status(200).json({message: "Change selected order's status successfully"})
  } catch (error) {
    console.log("Failed to change current order's status", error)
    res.status(500).json({message: "Failed to change current order's status"})
  }
}

// WEAPP
const generateOrder = async (req, res) => {
  try {
    const {count, price, type, status, address, shop, payment, note, commodities} = req.body

    const newOrder = await Order.create({
      price,
      count,
      type,
      address,
      status,
      payment,
      note,
      shop_id: JSON.parse(shop)._id,
      user_id: req.payload.aud
    })

    await generateOrderCommodities(JSON.parse(commodities), newOrder._id)
    await countCommodities(JSON.parse(commodities))
    res.status(200).json({message: 'Generate order successfully'})
  } catch (error) {
    console.log('Failed to generate current order', error)
    res.status(500).json({message: 'Failed to generate current order'})
  }
}

export {
  fetchAllOrders,
  deleteOrder,
  deleteOrders,
  doneOrder,
  generateOrder
}
