import Category from '../models/category.js'
import { deleteCommoditiesByCategory } from './commodity.js'

// WEB
const addCategory = async (req, res) => {
  try {
    const {name, type} = req.body
    const category = await Category.findOne({name})

    // check if the category already exists
    if (category) {
      return res.status(500).json({message: 'This category already exists'})
    }

    const newCategory = await Category.create({name, type})
    res.status(200).json({data: newCategory})
  } catch (error) {
    console.log('Failed to add category', error)
    res.status(500).json({message: 'Failed to add category'})
  }
}

const fetchAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({createdAt: -1})
    res.status(200).json({data: categories})
  } catch (error) {
    console.log('Failed to fetch all categories', error)
    res.status(500).json({message: 'Failed to fetch all categories'})
  }
}

const deleteSingleCategory = async (req, res) => {
  try {
    const {id} = req.params
    await deleteCommoditiesByCategory(id)
    await Category.findByIdAndDelete(id)
    res.status(200).json({message: 'Category deleted successfully'})
  } catch (error) {
    console.log('Failed to delete current category', error)
    res.status(500).json({message: 'Failed to delete curent category'})
  }
}

const deleteCategories = async (req, res) => {
  try {
    const {idList} = req.query
    const len = idList.length

    for (let i = 0; i < len; i++) {
      const id = idList[i]
      await deleteCommoditiesByCategory(id)
      await Category.findByIdAndDelete(id)

      if (i === len - 1) {
        res.status(200).json({message: 'Categories deleted successfully'})
      }
    }
  } catch (error) {
    console.log('Failed to delete these categories', error)
    res.status(500).json({message: 'Failed to delete these categories'})
  }
}

const modifyCategory = async (req, res) => {
  try {
    const {categoryId, newName} = req.body

    // check if the newName exists
    let isExist = false
    const categories = await Category.find()
    categories.forEach(item => {
      if (item.name === newName && item._id.toString() !== categoryId) {
        isExist = true
      }
    })

    if (isExist) {
      return res.status(500).json({message: 'This name already exists'})
    }
    
    await Category.findByIdAndUpdate(categoryId, {name: newName})
    res.status(200).json({message: 'Modify category successfully'})
  } catch (error) {
    console.log('Failed to modify current category', error)
    res.status(500).json({message: 'Failed to modify current category'})
  }
}

const onCategory = async (req, res) => {
  try {
    const {id} = req.params
    await Category.findByIdAndUpdate(id, {status: 'on'})
    res.status(200).json({message: 'Set category on successfully'})
  } catch (error) {
    console.log('Failed to set current category on', error)
    res.status(500).json({message: 'Failed to set current category on'})
  }
}

const offCategory = async (req, res) => {
  try {
    const {id} = req.params
    await Category.findByIdAndUpdate(id, {status: 'off'})
    res.status(200).json({message: 'Set category off successfully'})
  } catch (error) {
    console.log('Failed to set current category off', error)
    res.status(500).json({message: 'Failed to set current category off'})
  }
}

const increaseCount = id => new Promise((resolve, reject) => {
  const handle = async () => {
    let category = await Category.findById(id)
    category.commodity_count += 1
    await category.save()

    resolve({message: 'Increase count successfully'})
  }

  handle()
})

const reduceCount = id => new Promise((resolve, reject) => {
  const handle = async () => {
    let category = await Category.findById(id)
    category.commodity_count -= 1
    await category.save()

    resolve({message: 'Reduce count successfully'})
  }

  handle()
})

// WEAPP
const fetchAllCategoriesWeapp = async (req, res) => {
  try {
    const categories = await Category.find({status: 'on'}).sort({createdAt: -1})
    res.status(200).json({data: categories})
  } catch (error) {
    console.log('Failed to fetch all categories', error)
    res.status(500).json({message: 'Failed to fetch all categories'})
  }
}

export {
  addCategory,
  fetchAllCategories,
  deleteSingleCategory,
  deleteCategories,
  modifyCategory,
  onCategory,
  offCategory,
  increaseCount,
  reduceCount,
  fetchAllCategoriesWeapp
}
