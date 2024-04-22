const mongoose = require("mongoose");

//Chat Schema
const chatSchema = new mongoose.Schema({               
    name: String,
    userID: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    } 
});

//Chat Model
module.exports = mongoose.model("Chat", chatSchema); 
