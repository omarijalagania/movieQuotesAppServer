import mongoose from 'mongoose'

const genreSchema = new mongoose.Schema({
  genre: {
    type: String,
  },
  label: {
    type: String,
  },
})

export default mongoose.model('Genre', genreSchema)
