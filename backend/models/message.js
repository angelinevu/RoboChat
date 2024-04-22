const mongoose = require("mongoose");

//Message Schema
const messageSchema = new mongoose.Schema({               
    chatID: String,
    content: String,
    sender: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

//Message Model
module.exports = mongoose.model("message", messageSchema); 
