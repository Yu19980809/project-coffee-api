import mongoose from 'mongoose'

const userGroupSchema = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  group_id: mongoose.Schema.Types.ObjectId
}, {timestamps: true})

export default mongoose.model('UserGroup', userGroupSchema)
