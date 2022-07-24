import * as dotenv from "dotenv"
import express from "express"
import cors from "cors"
import path from "path"
import bodyParser from "body-parser"
import { connectDB } from "./config"

import { authMiddleware, swaggerMiddleware } from "./middlewares"
dotenv.config({ path: path.resolve(__dirname, "../.env") })
const app = express()
app.use(express.json())
connectDB(false)

app.use(cors())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }))
app.use("/images", express.static(path.join(__dirname, "images")))

//@ts-ignore
app.use("/api-docs", authMiddleware, swaggerMiddleware())

app.listen(process.env.PORT || "4400", () => {
  console.log(
    `Server is running on: ${process.env.BASE_URL}:${process.env.PORT}`,
  )
})