import Shop from '../models/shop.js'

// WEB
const addShop = async (req, res) => {
  try {
    const {name, location} = req.body
    const newShop = await Shop.create({name, location})
    res.status(200).json({data: newShop})
  } catch (error) {
    console.log('Failed to add shop', error)
    res.status(500).json({message: 'Failed to add shop'})
  }
}

// WEAPP
const fetchNearestShop = async (req, res) => {
  try {
    const shop = await Shop.findOne()
    res.status(200).json({data: shop})
  } catch (error) {
    console.log('Failed to fetch nearest shop', error)
    res.status(500).json({message: 'Failed to fetch nearest shop'})
  }
}

const fetchAllShops = async (req, res) => {
  try {
    const shops = await Shop.find().sort({createdAt: -1})
    res.status(200).json({data: shops})
  } catch (error) {
    console.log('Failed to fetch all shops', error)
    res.status(500).json({message: 'Failed to fetch all shops'})
  }
}

export {
  addShop,
  fetchNearestShop,
  fetchAllShops
}
