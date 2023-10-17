import Group from '../models/group.js'
import UserGroup from '../models/userGroup.js'

const addGroup = async (req, res) => {
  try {
    const {name} = req.body
    const newGroup = await Group.create({name})
    res.status(200).json({data: newGroup})
  } catch (error) {
    console.log('Failed to add group', error)
    res.status(500).json({message: 'Failed to add group'})
  }
}

const fetchAllGroups = async (req, res) => {
  try {
    const groups = await Group.find().sort({createdAt: -1})
    res.status(200).json({data: groups})
  } catch (error) {
    console.log('Failed to fetch all groups', error)
    res.status(500).json({message: 'Failed to fetch all groups'})
  }
}

const editGroup = async (req, res) => {
  try {
    const {groupId, newName} = req.body
    await Group.findByIdAndUpdate(groupId, {name: newName})
    res.status(200).json({message: 'Edit current group successfully'})
  } catch (error) {
    console.log('Failed to edit current group', error)
    res.status(500).json({message: 'Failed to edit current group'})
  }
}

const deleteGroup = async (req, res) => {
  try {
    const {id} = req.params
    await UserGroup.deleteMany({group_id: id})
    await Group.findByIdAndDelete(id)
    res.status(200).json({message: 'Delete current group successfully'})
  } catch (error) {
    console.log('Failed to delete current group', error)
    res.status(500).json({message: 'Failed to delete current group'})
  }
}

const deleteGroups = async (req, res) => {
  try {
    const {idList} = req.query
    const len = idList.length

    for (let i = 0; i < len; i++) {
      const groupId = idList[i]
      await UserGroup.deleteMany({group_id: groupId})
      await Group.findByIdAndDelete(groupId)

      if (i === len - 1) {
        res.status(200).json({message: 'Delete these groups successfully'})
      }
    }
  } catch (error) {
    console.log('Failed to delete these groups', error)
    res.status(500).json({message: 'Failed to delete these groups'})
  }
}

export {
  addGroup,
  fetchAllGroups,
  editGroup,
  deleteGroup,
  deleteGroups
}
