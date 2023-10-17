import mongoose from 'mongoose'
import Member from '../models/member.js'

const fetchAllMembers = async (req, res) => {
  try {
    const members = await Member.find().sort({createdAt: -1})
    res.status(200).json({data: members})
  } catch (error) {
    console.log('Failed to fetch all members', error)
    res.status(500).json({message: 'Failed to fetch all members'})
  }
}

const addMember = async (req, res) => {
  try {
    const {name, tel, address, password, role, shopId} = req.body
    const newMember = await Member.create({name, tel, address, password, role, shop_id: mongoose.Types.ObjectId(shopId)})
    res.status(200).json({data: newMember})
  } catch (error) {
    console.log('Failed to add current member', error)
    res.status(500).json({message: 'Failed to add current member'})
  }
}

const editMember = async (req, res) => {
  try {
    const {id, name, tel, address, password, role} = req.body
    await Member.findByIdAndUpdate(id, {name, tel, address, password, role})
    res.status(200).json({message: 'Edit member successfully'})
  } catch (error) {
    console.log('Failed to edit current member', error)
    res.status(500).json({message: 'Failed to edit current member'})
  }
}

// const modifyMembersRole = async (req, res) => {
//   try {
//     const {idList, role} = req.body
//     const len = idList.length

//     for (let i = 0; i < len; i++) {
//       await Member.findByIdAndUpdate(mongoose.Types.ObjectId(idList[i]), {role})

//       if (i === len - 1) {
//         res.status(200).json({message: 'Modify role for these members successfully'})
//       }
//     }
//   } catch (error) {
//     console.log('Failed to modify role for these members', error)
//     res.status(500).json({message: 'Failed to modify role for these members'})
//   }
// }

const deleteMember = async (req, res) => {
  try {
    const {id} = req.params
    await Member.findByIdAndDelete(id)
    res.status(200).json({message: 'Delete member successfully'})
  } catch (error) {
    console.log('Failed to delete current member', error)
    res.status(500).json({message: 'Failed to delete current member'})
  }
}

const deleteMembers = async (req, res) => {
  try {
    const {idList} = req.query
    const len = idList.length

    for (let i = 0; i < len; i++) {
      await Member.findByIdAndDelete(mongoose.Types.ObjectId(idList[i]))

      if (i === len - 1) {
        res.status(200).json({message: 'Delete these members successfully'})
      }
    }
  } catch (error) {
    console.log('Failed to delete these members', error)
    res.status(500).json({message: 'Failed to delete these members'})
  }
}

export {
  fetchAllMembers,
  addMember,
  editMember,
  deleteMember,
  deleteMembers
}
