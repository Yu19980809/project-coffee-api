import OrderCommodity from '../models/orderCommodity.js'
import Order from '../models/order.js'
import Shop from '../models/shop.js'
import Commodity from '../models/commodity.js'

const generateOrderCommodities = (commodities, orderId) => new Promise((resolve, reject) => {
  const len = commodities.length

  const handle = async () => {
    for (let i = 0; i < len; i++) {
      const {_id, count, price, temperature, sugar, addon, addonPrice, totalPrice, checked} = commodities[i]
      await OrderCommodity.create({count, price, temperature, sugar, addon, addon_price: addonPrice, total_price: totalPrice, checked, commodity_id: _id, order_id: orderId})

      if (i === len - 1) resolve({message: 'Generate orderCommodities successfully'})
    }
  }

  handle()
})

const fetchOrderCommodities = async (req, res) => {
  try {
    const orders = await Order.find({user_id: req.payload.aud}).sort({createdAt: -1})
    const len = orders.length
    if (len === 0) return res.status(200).json({data: []})

    let newOrders = []
    for (let i = 0; i < len; i++) {
      const order = orders[i]
      const shop = await Shop.findById(order.shop_id)
      const orderCommodities = await OrderCommodity.find({order_id: order._id})
      const commodities = await fetchCommodities(orderCommodities)
      const obj = {
        _id: order._id,
        count: order.count,
        price: order.price,
        address: JSON.parse(order.address),
        type: order.type,
        status: order.status,
        shop,
        commodities,
        createdAt: order.createdAt
      }
      newOrders.push(obj)

      if (i === len - 1) res.status(200).json({data: newOrders})
    }
  } catch (error) {
    console.log('Failed to fetchOrderCommodities', error)
    res.status(500).json({nessage: 'Failed to fectch orderCommodities'})
  }
}

const fetchCommodities = orderCommodities => new Promise((resolve, reject) => {
  const len = orderCommodities.length
  let commodities = []

  const handle = async () => {
    for (let i = 0; i < len; i++) {
      const orderCommodity = orderCommodities[i]
      const commodity = await Commodity.findById(orderCommodity.commodity_id)
      const obj = {
        _id: commodity._id,
        name: commodity.name,
        image: commodity.image,
        count: orderCommodity.count,
        price: orderCommodity.price,
        temperature: orderCommodity.temperature,
        sugar: orderCommodity.sugar,
        addon: orderCommodity.addon,
        addonPrice: orderCommodity.addon_price,
        totalPrice: orderCommodity.total_price,
        checked: orderCommodity.checked
      }
      commodities.push(obj)

      if (i === len - 1) resolve(commodities)
    }
  }

  handle()
})

const fetchAllCommoditiesOrderedData = (commodities, startDate, endDate) => new Promise((resolve, reject) => {
  const handle = async () => {
    const len = commodities.length
    let result = []

    for (let i = 0; i < len; i++) {
      const commodity = commodities[i]
      let newCommoditiy = {
        _id: commodity._id,
        category_id: commodity.category_id,
        image: commodity.image,
        name: commodity.name,
        count: 0,
        prices: 0
      }
      const orderCommodities = await OrderCommodity.find({
        commodity_id: commodity._id,
        createdAt: {
          $gte: new Date(`${startDate}T00:00:00Z`),
          $lte: new Date(`${endDate}T23:59:59Z`)
        }
      })
      orderCommodities.forEach(item => {
        newCommoditiy.count += item.count
        newCommoditiy.prices += item.price
      })
      result.push(newCommoditiy)

      if (i === len - 1) resolve(result)
    }
  }

  handle()
})

export {
  generateOrderCommodities,
  fetchOrderCommodities,
  fetchCommodities,
  fetchAllCommoditiesOrderedData
}
