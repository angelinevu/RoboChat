//This is the main file for the WebChat program
//where the the application is set up.

import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

import authRoutes from "./routes/authRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"
import userRoutes from "./routes/userRoutes.js"

import connectMongoDB from "./db/connectMongoDB.js"
import { app, server } from './socket/socket.js'

const PORT = process.env.PORT || 3000

dotenv.config()                     //.env config

app.use(express.json())             //json parse req.body 
app.use(cookieParser())

app.use("/api/auth", authRoutes)    //Route middlewares
app.use("/api/messages", messageRoutes)  
app.use("/api/users", userRoutes)  

server.listen(PORT, () => {            //Start server
    connectMongoDB()                //Connect to DB
    console.log(`\nServer Running on Port ${PORT}`)
})