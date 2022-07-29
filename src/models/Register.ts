import mongoose from 'mongoose'

const registerSchema = new mongoose.Schema({
  userName: {
    type: String,
    lowercase: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  repeatPassword: {
    type: String,
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
})

export default mongoose.model('User', registerSchema)
