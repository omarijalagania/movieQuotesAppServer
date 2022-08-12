import mongoose from 'mongoose'

const quoteSchema = new mongoose.Schema({
  quoteNameEng: {
    type: String,
  },
  quoteNameGe: {
    type: String,
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
  },
  poster: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

export default mongoose.model('Quote', quoteSchema)
