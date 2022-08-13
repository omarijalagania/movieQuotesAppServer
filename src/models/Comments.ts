import mongoose from 'mongoose'

const commentsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  quoteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
  },
  comment: {
    type: String,
  },
})

export default mongoose.model('Comment', commentsSchema)
