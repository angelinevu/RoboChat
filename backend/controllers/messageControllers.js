import Conversation from "../models/conversationModel.js"
import Message from "../models/messageModel.js"
import { getReceiverSocketID, io } from "../socket/socket.js"

//Fix to incorporate group chats: find by conversationID; in turn, conversationID
//found by participants in chat room

//api/messages/send/:id         //get conversationID
//api/messages/send/            participants in body, find conversation?
export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body
        const { id: receiverID } = req.params
        const senderID = req.user._id

        let conversation = await Conversation.findOne({            //Find a conversation
            participants: { $all: [senderID, receiverID] },
        })

        if (!conversation) {    //No existing chat room
            conversation = await Conversation.create({
                participants: [senderID, receiverID],
            })
        }

        const newMessage = new Message({
            senderID,
            receiverID,
            message
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id)
        }

        await Promise.all([conversation.save(), newMessage.save()]) //Save convo & message in ||

        const receiverSocketID = getReceiverSocketID(receiverID)
        if (receiverSocketID) {
            io.to(receiverSocketID).emit("newMessage", newMessage)  //Send event to specific client
        }

        res.status(201).json(newMessage)
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message)
        res.status(500).json({ error: "Internal server error" })
    }
}

//api/messages/:id
export const getMessages = async (req, res) => {        //View past messages
    try {
        const { id: userToChatId } = req.params
        const senderId = req.user._id
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages")     //Get message contents

        if (!conversation)
            return res.status(200).json([])

        const messages = conversation.messages

        res.status(200).json(messages)
    } catch (error) {
        console.log("Error in getMessages controller: ", error.message)
        res.status(500).json({ error: "Internal server error" })
    }
}

//get conversationID? or find conversation based off participants?

//api/messages/delete/:id
export const deleteConversation = async (req, res) => {
    try {
        const { id: conversationID } = req.params;
        const result = await Conversation.deleteOne({ _id : conversationID }); 

        if (!result.deletedCount) {
            return res.status(404).json({ error: "Conversation not found" });
        }

        res.status(200).json({ message: "Conversation deleted successfully" });
    } catch (error) {
        console.log("Error in deleteConversation controller: ", error.message)
        res.status(500).json({ error: "Internal server error" })
    }
}