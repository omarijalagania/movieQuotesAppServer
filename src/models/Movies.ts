import mongoose from 'mongoose'

const moviesSchema = new mongoose.Schema({
  movieNameEn: {
    type: String,
  },
  movieNameGe: {
    type: String,
  },
  genre: {
    type: Array,
    required: false,
    genre: {
      type: String,
    },
    label: {
      type: String,
    },
  },
  directorEn: {
    type: String,
  },
  directorGe: {
    type: String,
  },
  descriptionEn: {
    type: String,
  },
  descriptionGe: {
    type: String,
  },
  poster: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

export default mongoose.model('Movie', moviesSchema)
