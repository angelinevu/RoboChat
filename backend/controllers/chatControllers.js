import Chat from "../models/chatModel.js";
import Message from "../models/messageModel.js";
import User from "../models/userModel.js";

//access 1-1 chat: send userId JSON
//api/chat/
//**********************************************************************************************************
export const accessChat = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      console.log("UserId param not to accessChat controller");
      return res.sendStatus(400);
    }
    const userExists = await User.findById(userId);
    if (!userExists) {
      console.log("UserId does not exist");
      return res.status(404).json({ error: "User not found" });
    }

    var isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name pic email",
    });

    if (isChat.length > 0) {
      res.send(isChat[0]);
    } else {
      var chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userId],
      };

      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(FullChat);
    }
  } catch (error) {
    console.log("Error in accessChat controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Get chats
//api/chat/
//**********************************************************************************************************
export const fetchChats = async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    console.log("Error in fetchChats controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Create a GC of 3+ people
//api/chat/group
//**********************************************************************************************************
export const createGroupChat = async (req, res) => {
  try {
    const { users, name } = req.body;
    if (!users || !name) {
      return res.status(400).send({ message: "All fields are required" });
    }

    users.push(req.user._id);
    if (users.length < 2) {
      return res.status(400).send("A group chat must be of 3+ users");
    }

    const groupChat = await Chat.create({
      chatName: name,
      users: users,
      isGroupChat: true,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id }).populate(
      "users",
      "-password"
    );

    res.status(200).json(fullGroupChat);
  } catch (error) {
    console.log("Error in createGroupChat controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Remove a user from GC
//api/chat/groupremove
//**********************************************************************************************************
export const removeFromGroup = async (req, res) => {
  try {
    const { chatId, userId } = req.body;
    const removed = await Chat.findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userId },
      },
      {
        new: true,
      }
    ).populate("users", "-password");

    if (!removed) {
      res.status(404);
      throw new Error("Chat Not Found");
    } else {
      res.json(removed);
    }
  } catch (error) {
    console.log("Error in removeFromGroup controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Add a user to GC
//api/groupadd/
//**********************************************************************************************************
export const addToGroup = async (req, res) => {
  try {
    const { chatId, userId } = req.body;
    const added = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { users: userId },
      },
      {
        new: true,
      }
    ).populate("users", "-password");

    if (!added) {
      res.status(404);
      throw new Error("Chat Not Found");
    } else {
      res.json(added);
    }
  } catch (error) {
    console.log("Error in addtoGroup controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Rename a GC
//api/chat/rename
//**********************************************************************************************************
export const renameGroup = async (req, res) => {
  try {
    const { chatId, chatName } = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        chatName: chatName,
      },
      {
        new: true,
      }
    ).populate("users", "-password");
    if (!updatedChat) {
      res.status(404);
      throw new Error("Chat Not Found");
    } else {
      res.json(updatedChat);
    }
  } catch (error) {
    console.log("Error in renameGroup controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Delete a chat
//api/chat/delete
//**********************************************************************************************************
export const deleteChat = async (req, res) => {
  try {
    const { chatId } = req.body;
    const result = await Chat.findByIdAndDelete(chatId);

    if (result) {
      await Message.deleteMany({ chat: chatId });
      return res.status(200).json({ message: "Successfully deleted" });
    }
    return res.status(404).json({ message: "Conversation not found" });
  } catch (error) {
    console.log("Error in deleteChat controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
