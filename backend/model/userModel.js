const mongoose = require("mongoose");

//User Schema
const userSchema = new mongoose.Schema({               
    email: String,
    name: String,
    password: String,
    pic: String,
});

//User Model
module.exports = mongoose.model("User", userSchema); 
