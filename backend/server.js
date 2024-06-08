//This is the main file for the WebChat program
//where the the application is set up.

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import path from "path";

import connectMongoDB from "./db/connectMongoDB.js";
import { app, server } from "./socket/socket.js";

const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();

dotenv.config(); //.env config

app.use(express.json()); //json parse req.body
app.use(cookieParser());

app.use("/api/auth", authRoutes); //Route middlewares
app.use("/api/user", userRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/chat", chatRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});
server.listen(PORT, () => {
  //Start server
  connectMongoDB(); //Connect to DB
  console.log(`\nServer Running on Port ${PORT}`);
});
