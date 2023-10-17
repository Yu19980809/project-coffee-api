import express, { Router } from 'express'
import {
  addGroup,
  deleteGroup,
  deleteGroups,
  editGroup,
  fetchAllGroups
} from '../controlllers/group.js'

const router = express.Router()

router.get('/web', fetchAllGroups)
router.post('/web', addGroup)
router.patch('/web', editGroup)
router.delete('/web/:id', deleteGroup)
router.delete('/web', deleteGroups)

export default router
