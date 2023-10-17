import User from '../models/user.js'
import Group from '../models/group.js'
import UserGroup from '../models/userGroup.js'
import UserCoupon from '../models/userCoupon.js'
import { isVipExpired } from '../utils/index.js'

// WEB
const fetchAllUsers = async (req, res) => {
  try {
    let users = await User.find().sort({createdAt: -1})
    if (users.length === 0) return res.status(200).json({data: []})

    users = users.map(item => {
      if (item.is_vip === 'yes' && isVipExpired(item.vip_end_date)) {
        item.is_vip = 'no'
      }

      return item
    })

    users = await fetchUserGroup(users)
    users = await fetchGroups(users)
    res.status(200).json({data: users})
  } catch (error) {
    console.log('Failed to fetch all users', error)
    res.status(500).json({message: 'Failed to fetch all users'})
  }
}

const fetchUserGroup = users => new Promise((resolve, reject) => {
  const len = users.length
  let newUsers = []

  const handle = async () => {
    for (let i = 0; i < len; i++) {
      const user = users[i]
      const userGroups = await UserGroup.find({user_id: user._id})
      const newUser = {
        _id: user._id,
        name: user.name,
        tel: user.tel,
        money: user.money,
        is_vip: user.is_vip,
        vip_start_date: user.vip_start_date,
        vip_end_date: user.vip_end_date,
        avatar: user.avatar,
        userGroups
      }
      newUsers.push(newUser)

      if (i === len - 1) {
        resolve(newUsers)
      }
    }
  }

  handle()
})

const fetchGroups = users => new Promise((resolve, reject) => {
  const len = users.length
  let newUsers = []

  const handle = async () => {
    for (let i = 0; i < len; i++) {
      const user = users[i]
      const userGroups = user.userGroups
      const groupsLen = userGroups.length
      let groups = []

      for (let j = 0; j < groupsLen; j++) {
        const userGroup = userGroups[j]
        const group = await Group.findById(userGroup.group_id)
        if (group) groups.push(group.name)
      }

      const newUser = {
        _id: user._id,
        name: user.name,
        tel: user.tel,
        money: user.money,
        is_vip: user.is_vip,
        vip_start_date: user.vip_start_date,
        vip_end_date: user.vip_end_date,
        avatar: user.avatar,
        groups
      }
      newUsers.push(newUser)

      if (i === len - 1) {
        resolve(newUsers)
      }
    }
  }

  handle()
})

const giveVip = async (req, res) => {
  try {
    const {idList, startDate, endDate} = req.body
    const len = idList.length

    for (let i = 0; i < len; i++) {
      await User.findByIdAndUpdate(idList[i], {is_vip: 'yes', vip_start_date: startDate, vip_end_date: endDate})

      if (i === len - 1) {
        res.status(200).json({message: 'Give vip to user successfully'})
      }
    }
  } catch (error) {
    console.log('Failed to give vip to user', error)
    res.status(500).json({message: 'Failed to give vip to user'})
  }
}

const giveCoupon = async (req, res) => {
  try {
    const {idList, couponId} = req.body
    const len = idList.length

    for (let i = 0; i < len; i++) {
      await UserCoupon.create({user_id: idList[i], coupon_id: couponId})

      if (i === len - 1) res.status(200).json({message: 'Give coupon to selected users successfully'})
    }
  } catch (error) {
    console.log('Failed to give coupon to user', error)
    res.status(500).json({message: 'Failed to give coupon to user'})
  }
}

const setUsersGroup = async (req, res) => {
  try {
    const {idList, groupId} = req.body
    const len = idList.length

    for (let i = 0; i < len; i++) {
      await UserGroup.create({user_id: idList[i], group_id: groupId})
      const group = await Group.findById(groupId)
      group.user_count += 1
      await group.save()

      if (i === len - 1) {
        res.status(200).json({message: 'Set group for users successfully'})
      }
    }
  } catch (error) {
    console.log('Failed to set group for these users', error)
    res.status(500).json({message: 'Failed to set groups for these users'})
  }
}

// WEAPP
const updateUserInfo = async (req, res) => {
  try {
    const {avatar, name, tel} = req.body
    const updatedUser = await User.findByIdAndUpdate(req.payload.aud, {avatar, name, tel}, {new: true})
    res.status(200).json({data: updatedUser})
  } catch (error) {
    console.log('Failed to update info for current user', error)
    res.status(500).json({message: 'Failed to update info for current user'})
  }
}

export {
  fetchAllUsers,
  giveVip,
  giveCoupon,
  setUsersGroup,
  updateUserInfo
}
