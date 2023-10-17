import express from 'express'
import {
  addCategory,
  deleteCategories,
  deleteSingleCategory,
  fetchAllCategories,
  modifyCategory,
  onCategory,
  offCategory,
  fetchAllCategoriesWeapp
} from '../controlllers/category.js'

const router = express.Router()

// WEB
router.get('/web', fetchAllCategories)
router.post('/web', addCategory)
router.patch('/web', modifyCategory)
router.patch('/web/on/:id', onCategory)
router.patch('/web/off/:id', offCategory)
router.delete('/web/:id', deleteSingleCategory)
router.delete('/web', deleteCategories)

// WEAPP
router.get('/weapp', fetchAllCategoriesWeapp)

export default router
