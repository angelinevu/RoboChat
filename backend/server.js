import express from "express"
import dotenv from "dotenv"
//const express = require("express")
//const dotenv = require("dotenv")

import authRoutes from "./routes/authRoutes.js"

const app = express()

dotenv.config()
const PORT = process.env.PORT || 3000

app.use("/api/auth", authRoutes)

app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`))