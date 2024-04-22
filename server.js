const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require('./backend/routes/authRoutes');
const chatRoutes = require('./backend/routes/chatRoutes');
const User = require("./backend/models/user")          
const Chat = require("./backend/models/chat")
const Message = require("./backend/models/message")

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

//Connect to DB
mongoose.connect(MONGO_URL).then(() => {     
    console.log("Database is connected.\n");

    //Routes
    app.use("/", authRoutes);   
    app.use("/chat", chatRoutes);

    //Create Server
    app.listen(PORT, () => {   
        console.log("Server is listening at port %d", PORT);
    });
}).catch((error) => console.log(error));
