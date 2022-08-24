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
  },
  repeatPassword: {
    type: String,
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
  },
  provider: {
    type: String,
  },
  poster: {
    type: String,
  },
})

export default mongoose.model('User', registerSchema)
