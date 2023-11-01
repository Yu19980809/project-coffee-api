import Commodity from '../models/commodity.js'
import Category from '../models/category.js'
import { isExist, isOtherExist } from './utils.js'
import { increaseCount, reduceCount } from './category.js'
import { fetchAllCommoditiesOrderedData } from './orderCommodity.js'

// WEB
const fetchAllCommodities = async (req, res) => {
  try {
    const commodities = await Commodity.find().sort({createdAt: -1})
    if (commodities.length === 0) {
      return res.status(200).json({data: []})
    }

    const newCommodities = await fetchCategory(commodities)
    res.status(200).json({data: newCommodities})
  } catch (error) {
    console.log('Failed to fetch all commodities', error)
    res.status(500).json({messae: 'Failed to fetch all commodities'})
  }
}

const fetchAllCommoditiesData = async (req, res) => {
  try {
    const {startDate, endDate} = req.query
    const commodities = await Commodity.find().sort({createdAt: -1})
    const result = await fetchAllCommoditiesOrderedData(commodities, startDate, endDate)
    res.status(200).json({data: result})
  } catch (error) {
    console.log("Failed to fetch commodities' data", error)
    res.status(500).json({message: "Failed to fetch commodities' data"})
  }
}

const fetchCategory = commodities => new Promise((resolve, reject) => {
  const handle = async () => {
    const len = commodities.length
    let newCommodities = []

    for (let i = 0; i < len; i++) {
      const commodity = commodities[i]
      const category = await Category.findById(commodity.category_id)

      const newCommodity = {
        _id: commodity._id,
        name: commodity.name,
        sales: commodity.sales,
        price: commodity.price,
        status: commodity.status,
        image: commodity.image,
        category
      }
      newCommodities.push(newCommodity)

      if (i === len - 1) {
        resolve(newCommodities)
      }
    }
  }

  handle()
})

const addCommodity = async (req, res) => {
  try {
    const {name, price, image, category_id} = req.body

    // check if this name already used
    const commodities = await Commodity.find()
    if (isExist(name, commodities)) {
      return res.status(500).json({message: 'This name already exists'})
    }

    const newCommodity = await Commodity.create({name, price, image, category_id})
    await increaseCount(category_id)
    res.status(200).json({data: newCommodity})
  } catch (error) {
    console.log('Failed to add commodity', error)
    res.status(500).json({message: 'Failed to add commodity'})
  }
}

const onCommodity = async (req, res) => {
  try {
    const {id} = req.params
    await Commodity.findByIdAndUpdate(id, {status: 'on'})
    res.status(200).json({message: 'Set current commodity on successfully'})
  } catch (error) {
    console.log('Failed to set current commodity on', error)
    res.status(500).json({message: 'Failed to set current commodity on'})
  }
}

const offCommodity = async (req, res) => {
  try {
    const {id} = req.params
    await Commodity.findByIdAndUpdate(id, {status: 'off'})
    res.status(200).json({message: 'Set current commodity off successfully'})
  } catch (error) {
    console.log('Failed to set current commodity off', error)
    res.status(500).json({message: 'Failed to set current commodity off'})
  }
}

const offCommodities = async (req, res) => {
  try {
    const {idList} = req.body
    const len = idList.length

    for (let i = 0; i < len ; i++) {
      await Commodity.findByIdAndUpdate(idList[i], {status: 'off'})

      if (i === len - 1) {
        res.status(200).json({message: 'Set these commodities off successfullly'})
      }
    }
  } catch (error) {
    console.log('Failed to set these commodities off', error)
    res.status(500).json({message: 'Failed to set these commodities off'})
  }
}

const modifyCommoditiesCategory = async (req, res) => {
  try {
    const {idList, category_id} = req.body
    const len = idList.length

    for (let i = 0; i < len; i++) {
      const commodity = await Commodity.findById(idList[i])
      const originCategoryId = commodity.category_id
      commodity.category_id = category_id
      await commodity.save()
      await increaseCount(category_id)
      await reduceCount(originCategoryId)

      if (i === len - 1) {
        res.status(200).json({message: 'Modify category for these commodities successfully'})
      }
    }
  } catch (error) {
    console.log('Failed to modify category for these commodities', error)
    res.status(500).json({message: 'Failed to modify category for these commodities'})
  }
}

const editCommodity = async (req, res) => {
  try {
    const {id, name, price, image, category_id} = req.body

    // check if the name already exists
    const commodities = await Commodity.find()
    if (isOtherExist(id, name, commodities)) {
      return res.status(500).json({message: 'This name already exists'})
    }

    // check if changed category
    const originCategoryId = commodities.category_id
    if (originCategoryId !== category_id) {
      await increaseCount(category_id)
      await reduceCount(originCategoryId)
    }

    await Commodity.findByIdAndUpdate(id, {name, price, image, category_id}, {new: true})
    res.status(200).json({message: 'Edit commodity successfully'})
  } catch (error) {
    console.log('Failed to edit current commodity', error)
    res.status(500).json({message: 'Failed to edit current commodity'})
  }
}

const deleteCommodity = async (req, res) => {
  try {
    const {id} = req.params
    // 删除商品
    const commodity = await Commodity.findById(id)
    await commodity.delete()
    // 更改其所属分类的商品数量
    await reduceCount(commodity.category_id)
    res.status(200).json({message: 'Delete current commodity successfully'})
  } catch (error) {
    console.log('Failed to delete current commodity', error)
    res.status(500).json({message: 'Failed to delete current commodity'})
  }
}

const deleteCommoditiesByCategory = categoryId => new Promise((resolve, reject) => {
  const handle = async () => {
    const commodities = await Commodity.find({category_id: categoryId})
    const len = commodities.length

    if (len === 0) resolve({message: 'Delete commodities by category successfully'}) 

    for (let i = 0; i < len; i++) {
      await Commodity.findByIdAndDelete(commodities[i]._id)

      if (i === len - 1) resolve({message: 'Delete commodities by category successfully'})
    }
  }

  handle()
}) 

// WEAPP
const fetchAllCommoditiesWeapp = async (req, res) => {
  try {
    let commodities = await Commodity.find({status: 'on'})
    commodities = await fetchCategory(commodities)
    
    // 根据category进行分类
    let newCommodities = []
    commodities.map(commodity => {
      if (newCommodities.length === 0) {
        newCommodities.push({category: commodity.category, commodities: [commodity]})
      } else {
        let result = newCommodities.some(item => {
          if (item.category.name === commodity.category.name) {
            item.commodities.push(commodity)
            return true
          }
        })

        if (!result) newCommodities.push({category: commodity.category, commodities: [commodity]})
      }
    })

    // 检测category显示状态
    newCommodities = newCommodities.filter(item => item.category.status === 'on')

    res.status(200).json({data: newCommodities})
  } catch (error) {
    console.log('Failed to fetch all commodities', error)
    res.status(500).json({message: 'Failed to fetch all commodities'})
  }
}

const fetchTop3Drinks = async (req, res) => {
  try {
    const commodities = await Commodity.find().sort({sales: -1})
    const len = commodities.length
    let newCommodities = []

    for (let i = 0; i < len; i++) {
      const commodity = commodities[i]
      const category = await Category.findById(commodity.category_id)
      if (category.type === '饮品' && category.status === 'on') newCommodities.push(commodity)

      if (i === len - 1) {
        const top3 = newCommodities.slice(0, newCommodities.length >= 3 ? 3 : newCommodities.length)
        res.status(200).json({data: top3})
      }
    }
  } catch (error) {
    console.log('Failed to fetch top 3 drinks', error)
    res.status(500).json({message: 'Failed to fetch top 3 drinks'})
  }
}

const countCommodities = commodities => new Promise((resolve, reject) => {
  const len = commodities.length

  const handle = async () => {
    for (let i = 0; i < len; i++) {
      const {_id, count} = commodities[i]
      let commodity = await Commodity.findById(_id)
      commodity.sales += count
      await commodity.save()

      if (i === len - 1) resolve({message: 'Count commodities successfully'})
    }
  }

  handle()
})

export {
  fetchAllCommodities,
  fetchAllCommoditiesData,
  addCommodity,
  onCommodity,
  offCommodity,
  offCommodities,
  modifyCommoditiesCategory,
  editCommodity,
  deleteCommodity,
  deleteCommoditiesByCategory,
  fetchAllCommoditiesWeapp,
  fetchTop3Drinks,
  countCommodities
}
