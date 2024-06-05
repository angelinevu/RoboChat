import Message from "../models/messageModel.js";
import Chat from "../models/chatModel.js";
import { getReceiverSocketID, io } from "../socket/socket.js";

//Send a message to a chat
//api/message/
//**********************************************************************************************************
export const sendMessage = async (req, res) => {
  try {
    const { content, chatId } = req.body;

    if (!content || !chatId) {
      console.log("Invalid data passed into sendMessage controller");
      return res.status(400).send("Invalid data");
    }

    // Create new message
    let newMessage = {
      sender: req.user._id,
      content,
      chat: chatId,
    };

    let message = await Message.create(newMessage);
    message = await Message.findById(message._id)
      .populate("sender", "name pic")
      .populate("chat")
      .populate({
        path: "chat.users",
        select: "name pic",
      });

    // Find the chat and its users
    const chat = await Chat.findOne({ _id: chatId }).select("users");
    if (!chat) {
      console.log("Chat not found");
      return res.status(404).send("Chat not found");
    }

    // Emit the message to all users in the chat except the sender
    chat.users.forEach((user) => {
      if (user._id.toString() !== req.user._id.toString()) {
        const receiverSocketID = getReceiverSocketID(user._id.toString());
        console.log("socketid: ", receiverSocketID);
        if (receiverSocketID) {
          io.to(receiverSocketID).emit("newMessage", message); // Send event to specific client
        }
      }
    });

    // Update the latest message in the chat
    await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

    // Return the message
    return res.status(201).json(message);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Retrieve messages
//api/message/:chatId
//**********************************************************************************************************
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "fullName pic")
      .populate("chat");

    return res.json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
