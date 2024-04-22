const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');

//const authRoutes = require("./backend/routes/authRoutes");
//const chatRoutes = require("./backend/routes/chatRoutes");
const userRoutes = require("./backend/routes/userRoutes");

const app = express();
app.use(bodyParser.json());
dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

//Connect to DB
mongoose.connect(MONGO_URL).then(() => {     
    console.log("\nDatabase is connected.");

    //Create Server
    app.listen(PORT, () => {   
        console.log("Server is listening at port %d.", PORT);
    });
}).catch((error) => console.log(error));

//Routes
//app.use("/", authRoutes);   
//app.use("/chat", chatRoutes);
app.use("/user", userRoutes);