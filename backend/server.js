//This is the main file for the WebChat program
//where the the application is set up.

import express from "express"
import dotenv from "dotenv"

import authRoutes from "./routes/authRoutes.js"
import connectMongoDB from "./db/connectMongoDB.js"

const app = express()               //Variables
const PORT = process.env.PORT || 3000

dotenv.config()                     //.env config

app.use(express.json())             //json parse req.body 

app.use("/api/auth", authRoutes)    //Route middlewares

app.listen(PORT, () => {            //Start server
    connectMongoDB()                //Connect to DB
    console.log(`\nServer Running on Port ${PORT}`)
})