import Address from '../models/address.js'

const fetchUserAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({user_id: req.payload.aud}).sort({createdAt: -1})
    res.status(200).json({data: addresses})
  } catch (error) {
    console.log('Failed to fetch address for current user', error)
    res.status(500).json({message: 'Failed to fetch address for current user'})
  }
}

const fetchUserDefaultAddress = async (req, res) => {
  try {
    const address = await Address.findOne({user_id: req.payload.aud, is_default: 'yes'})
    res.status(200).json({data: address})
  } catch (error) {
    console.log("Failed to fetch user's default address", error)
    res.status(500).json({message: "Failed to fetch user's default address"})
  }
}

const addAddress = async (req, res) => {
  try {
    const {name, tel, location, door, is_default} = req.body

    if (is_default === 'yes') {
      await Address.updateMany({is_default: 'yes'}, {$set: {is_default: 'no'}})
    }

    await Address.create({name, tel, location, door, is_default, user_id: req.payload.aud})
    res.status(200).json({message: 'Add address successfully'})
  } catch (error) {
    console.log('Failed to add current address', error)
    res.status(500).json({message: 'Failed to add current address'})
  }
}

const fetchAddressInfo = async (req, res) => {
  try {
    const {id} = req.params
    const address = await Address.findById(id)
    res.status(200).json({data: address})
  } catch (error) {
    console.log('Failed to fetch info about current address', error)
    res.status(500).json({message: 'Failed to fetch info about current address'})
  }
}

const updateAddressInfo = async (req, res) => {
  try {
    const {addressId, addressInfo} = req.body
    
    if (addressInfo.is_default === 'yes') {
      await Address.updateMany({is_default: 'yes'}, {$set: {is_default: 'no'}})
    }

    await Address.findByIdAndUpdate(addressId, addressInfo)
    res.status(200).json({message: 'Update address successfully'})
  } catch (error) {
    console.log('Failed to update current address', error)
    res.status(500).json({message: 'Failed to update current address'})
  }
}

export {
  fetchUserAddresses,
  fetchUserDefaultAddress,
  addAddress,
  fetchAddressInfo,
  updateAddressInfo
}
