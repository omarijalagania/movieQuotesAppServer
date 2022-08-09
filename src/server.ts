import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import path from 'path'
import SwaggerUI from 'swagger-ui-express'
import bodyParser from 'body-parser'
import { connectDB } from 'config'
import { upload } from 'utils'
import {
  RegisterRouter,
  MovieRouter,
  GenreRouter,
  CrudMovieRouter,
} from 'routes'
import { swaggerMiddleware } from 'middlewares'
dotenv.config({ path: path.resolve(__dirname, '../.env') })
const app = express()
app.use(express.json())
connectDB(false)

app.use(cors())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }))
app.use('/images', express.static(path.join(__dirname, '../images')))

app.use('/user', RegisterRouter)
app.use('/movie', upload.single('poster'), MovieRouter)
app.use('/movies', GenreRouter)
app.use('/my-movies', CrudMovieRouter)
app.use('/api-docs', SwaggerUI.serve, swaggerMiddleware())

app.listen(process.env.PORT || '4400', () => {
  console.log(
    `Server is running on: ${process.env.BASE_URL}:${process.env.PORT}`
  )
})
