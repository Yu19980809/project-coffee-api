import express from 'express'
import {
  fetchAllMembers,
  addMember,
  editMember,
  deleteMember,
  deleteMembers
} from '../controlllers/member.js'

const router = express.Router()

router.get('/web', fetchAllMembers)
router.post('/web', addMember)
router.patch('/web', editMember)
router.delete('/web/:id', deleteMember)
router.delete('/web', deleteMembers)

export default router
