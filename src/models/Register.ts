import mongoose from 'mongoose'

const registerSchema = new mongoose.Schema({
  user_name: {
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
})

export default mongoose.model('User', registerSchema)
