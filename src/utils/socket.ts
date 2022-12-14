import * as dotenv from 'dotenv'
import path from 'path'
import { Server } from 'socket.io'
import { createServer } from 'http'
import express from 'express'

dotenv.config({ path: path.resolve(__dirname, '../../.env') })

export const app = express()
export const httpServer = createServer(app)
export const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL,
  },
})

let onlineUsers: any[] = []

const addNewUser = (userId: any, socketId: string) => {
  !onlineUsers.some((user) => user.userId === userId) &&
    onlineUsers.push({ userId, socketId })
}

const removeUser = (socketId: string) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId)
}

const getUser = (userId: any) => {
  return onlineUsers.find((user) => user.userId === userId)
}

io.on('connection', (socket) => {
  socket.on('newUser', (userId) => {
    addNewUser(userId?.userId, socket.id)
  })

  socket.on('like', (like) => {
    io.emit('gotLike', like)
  })

  socket.on('comment', (comment) => {
    io.emit('gotComment', comment)
  })
  socket.on('notification', (notification) => {
    let socketId = getUser(notification?.userId)
    io.to(socketId?.socketId).emit('gotNotification', notification)
  })

  socket.on('notificationLike', (like) => {
    let socketId = getUser(like?.userId)
    io.to(socketId?.socketId).emit('gotNotificationLike', like)
  })

  socket.on('disconnect', () => {
    removeUser(socket.id)
  })
})
