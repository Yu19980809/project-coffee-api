import express from 'express'
import {
  fetchAllCommodities,
  fetchAllCommoditiesData,
  onCommodity,
  offCommodity,
  offCommodities,
  addCommodity,
  editCommodity,
  deleteCommodity,
  modifyCommoditiesCategory,
  fetchAllCommoditiesWeapp,
  fetchTop3Drinks
} from '../controlllers/commodity.js'

const router = express.Router()

// WEB
router.get('/web/data', fetchAllCommoditiesData)
router.get('/web', fetchAllCommodities)
router.patch('/web/category', modifyCommoditiesCategory)
router.patch('/web/on/:id', onCommodity)
router.patch('/web/off_single/:id', offCommodity)
router.patch('/web/off_multiple', offCommodities)
router.post('/web', addCommodity)
router.patch('/web', editCommodity)
router.delete('/web/:id', deleteCommodity)

// WEAPP
router.get('/weapp', fetchAllCommoditiesWeapp)
router.get('/weapp/top3', fetchTop3Drinks)

export default router
