import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import path from 'path'
import { httpServer, io, app } from 'utils'

import SwaggerUI from 'swagger-ui-express'
import bodyParser from 'body-parser'
import { connectDB } from 'config'
import { upload } from 'utils'
import {
  RegisterRouter,
  MovieRouter,
  GenreRouter,
  CrudMovieRouter,
  QuoteRouter,
  SingleQuotes,
  CommentRoutes,
  LikesRouter,
} from 'routes'
import { swaggerMiddleware } from 'middlewares'

dotenv.config({ path: path.resolve(__dirname, '../.env') })

app.use(express.json())
connectDB(false)

app.use(cors())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }))
app.use('/images', express.static(path.join(__dirname, '../images')))

app.use('/user', RegisterRouter)
app.use('/movie', upload.single('poster'), MovieRouter)
app.use('/quote', upload.single('poster'), QuoteRouter)
app.use('/quotes', SingleQuotes)
app.use('/movies', GenreRouter)
app.use('/my-movies', CrudMovieRouter)
app.use('/comments', CommentRoutes)
app.use('/likes', LikesRouter)

app.use('/api-docs', SwaggerUI.serve, swaggerMiddleware())

io.listen(4343)

httpServer.listen(process.env.PORT || '4400', () => {
  console.log(
    `Server is running on: ${process.env.BASE_URL}:${process.env.PORT}`
  )
})
