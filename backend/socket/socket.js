/*
import { Server } from "socket.io"
import http from "http"
import express from "express"

const app = express()

const server = http.createServer(app)
const io = new Server(server, {
	cors: {
		origin: ["http://localhost:5000"],	//Frontend
		methods: ["GET", "POST"],
	},
})

export const getReceiverSocketID = (receiverID) => {
	return userSocketMap[receiverID]
}

const userSocketMap = {} // {userId: socketId}

io.on("connection", (socket) => {
	console.log("a user connected", socket.id)

	const userId = socket.handshake.query.userId
	if (userId != "undefined") userSocketMap[userId] = socket.id

	//Send events to all the connected clients
	io.emit("getOnlineUsers", Object.keys(userSocketMap))

	//Listen to the events
	socket.on("disconnect", () => {
		console.log("user disconnected", socket.id)
		delete userSocketMap[userId]
		io.emit("getOnlineUsers", Object.keys(userSocketMap))
	})
})

export { app, io, server }
*/
