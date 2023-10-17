import Coupon from '../models/coupon.js'
import UserCoupon from '../models/userCoupon.js'

const fetchAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({createdAt: -1})
    res.status(200).json({data: coupons})
  } catch (error) {
    console.log('Failed to fetch all coupons', error)
    res.status(500).json({message: 'Failed to fectch all coupons'})
  }
}

const fetchAllOnCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find({status: 'on'}).sort({createdAt: -1})
    res.status(200).json({data: coupons})
  } catch (error) {
    console.log('Failed to fetch all coupons', error)
    res.status(500).json({message: 'Failed to fectch all coupons'})
  }
}

const onCoupon = async (req, res) => {
  try {
    const {id} = req.params
    await Coupon.findByIdAndUpdate(id, {status: 'on'})
    res.status(200).json({message: 'Set current on successfully'})
  } catch (error) {
    console.log('Failed to set current coupon on', error)
    res.status(500).json({message: 'Failed to set current coupon on'})
  }
}

const offCoupon = async (req, res) => {
  try {
    const {id} = req.params
    await UserCoupon.deleteMany({coupon_id: id})
    await Coupon.findByIdAndUpdate(id, {status: 'off'})
    res.status(200).json({message: 'Set current off successfully'})
  } catch (error) {
    console.log('Failed to set current coupon off', error)
    res.status(500).json({message: 'Failed to set current coupon off'})
  }
}

const offCoupons = async (req, res) => {
  try {
    const {idList} = req.body
    const len = idList.length

    for (let i = 0; i < len; i++) {
      const couponId = idList[i]
      await UserCoupon.deleteMany({coupon_id: couponId})
      await Coupon.findByIdAndUpdate(couponId, {status: 'off'})

      if (i === len -1) {
        res.status(200).json({message: 'Set these coupons off successfully'})
      }
    }
  } catch (error) {
    console.log('Failed to set these coupons off', error)
    res.status(500).json({message: 'Failed to set these coupons off'})
  }
}

const addCoupon = async (req, res) => {
  try {
    const {name, value, start_date, end_date} = req.body
    const newCoupon = await Coupon.create({name, value, start_date, end_date})
    res.status(200).json({data: newCoupon})
  } catch (error) {
    console.log('Failed to add current coupon', error)
    res.status(500).json({message: 'Failed to add current coupon'})
  }
}

const editCoupon = async (req, res) => {
  try {
    const {id, name, value, start_date, end_date} = req.body
    await Coupon.findByIdAndUpdate(id, {name, value, start_date, end_date})
    res.status(200).json({message: 'Edit current coupon successfully'})
  } catch (error) {
    console.log('Failed to edit current coupon', error)
    res.status(500).json({message: 'Failed to edit current coupon'})
  }
}

const deleteCoupon = async (req, res) => {
  try {
    const {id} = req.params
    await UserCoupon.deleteMany({coupon_id: id})
    await Coupon.findByIdAndDelete(id)
    res.status(200).json({message: 'Delete current coupon successfully'})
  } catch (error) {
    console.log('Failed to delete current coupon', error)
    res.status(500).json({message: 'Failed to delete current coupon'})
  }
}

const deleteCoupons = async (req, res) => {
  try {
    const {idList} = req.query
    const len = idList.length

    for (let i = 0; i< len; i++) {
      const couponId = idList[i]
      await UserCoupon.deleteMany({coupon_id: couponId})
      await Coupon.findByIdAndUpdate(couponId)

      if (i === len - 1) {
        res.status(200).json({message: 'Delete these coupons successfully'})
      }
    }
  } catch (error) {
    console.log('Failed to delete these coupons', error)
    res.status(500).json({message: 'Failed to delete these coupons'})
  }
}

export {
  fetchAllCoupons,
  fetchAllOnCoupons,
  onCoupon,
  offCoupon,
  offCoupons,
  addCoupon,
  editCoupon,
  deleteCoupon,
  deleteCoupons
}
