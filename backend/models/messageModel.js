import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({
    senderID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiverID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message:{           //Message content
        type: String,
        required: true
    }
}, {timestamps: true})  //Created at, updated at

const Message = mongoose.model("Message", messageSchema)

export default Message