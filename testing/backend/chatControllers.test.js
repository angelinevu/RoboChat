import {
  accessChat,
  fetchChats,
  createGroupChat,
  deleteChat,
} from "../../backend/controllers/chatControllers.js";
import Chat from "../../backend/models/chatModel.js";
import User from "../../backend/models/userModel.js";
import { getReceiverSocketID } from "../../backend/socket/socket.js";

jest.mock("../backend/models/chatModel");
jest.mock("../backend/models/userModel");
jest.mock("../backend/socket/socket");

describe("Chat Controller", () => {
  let req;
  let res;
  let jsonMock;

  beforeEach(() => {
    req = { body: {}, user: { _id: "user_id" } };
    jsonMock = jest.fn();
    res = {
      status: jest.fn().mockReturnValue({ json: jsonMock }),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("accessChat", () => {
    it("should return 400 if userId is missing", async () => {
      req.body = {
        userId: null,
      };
      await accessChat(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ error: "User ID is missing" });
    });
  });

  describe("fetchChats", () => {
    it("should fetch chats for the user", async () => {
      const chatData = [{ _id: "chat_id" }];
      Chat.find.mockResolvedValueOnce(chatData);

      await fetchChats(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(chatData);
    });
  });

  describe("createGroupChat", () => {
    it("should create a group chat", async () => {
      req.body = {
        users: ["user_id_1", "user_id_2"],
        name: "Group Chat",
      };

      const createdChat = { _id: "group_chat_id" };
      Chat.create.mockResolvedValueOnce(createdChat);

      await createGroupChat(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(createdChat);
    });
  });

  describe("deleteChat", () => {
    let req;
    let res;
    let jsonMock;

    beforeEach(() => {
      req = { body: {} };
      jsonMock = jest.fn();
      res = {
        status: jest.fn().mockReturnValue({ json: jsonMock }),
      };
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should delete an existing chat", async () => {
      req.body.chatId = "valid_chat_id";
      const deletedChat = { _id: "valid_chat_id", users: ["user_id"] };
      Chat.findByIdAndDelete.mockResolvedValueOnce(deletedChat);
      Message.deleteMany.mockResolvedValueOnce();
      getReceiverSocketID.mockReturnValueOnce("receiver_socket_id");

      await deleteChat(req, res);

      expect(Chat.findByIdAndDelete).toHaveBeenCalledWith("valid_chat_id");
      expect(Message.deleteMany).toHaveBeenCalledWith({
        chat: "valid_chat_id",
      });
      expect(getReceiverSocketID).toHaveBeenCalledWith("user_id");
      expect(jsonMock).toHaveBeenCalledWith({
        message: "Successfully deleted",
      });
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it("should return 404 if chat is not found", async () => {
      req.body.chatId = "invalid_chat_id";
      Chat.findByIdAndDelete.mockResolvedValueOnce(null);

      await deleteChat(req, res);

      expect(Chat.findByIdAndDelete).toHaveBeenCalledWith("invalid_chat_id");
      expect(jsonMock).toHaveBeenCalledWith({
        message: "Conversation not found",
      });
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it("should handle errors and return 500", async () => {
      req.body.chatId = "valid_chat_id";
      Chat.findByIdAndDelete.mockRejectedValueOnce(new Error("Database error"));

      await deleteChat(req, res);

      expect(Chat.findByIdAndDelete).toHaveBeenCalledWith("valid_chat_id");
      expect(jsonMock).toHaveBeenCalledWith({ error: "Internal server error" });
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});
