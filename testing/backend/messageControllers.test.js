import {
  sendMessage,
  getMessages,
} from "../../backend/controllers/messageControllers";
import Message from "../../backend/models/messageModel";
import Chat from "../../backend/models/chatModel";
import { getReceiverSocketID, io } from "../../backend/socket/socket";

// Mock the models and functions
jest.mock("../backend/models/messageModel");
jest.mock("../backend/models/chatModel");
jest.mock("../backend/socket/socket");

describe("Message Controller", () => {
  let req;
  let res;
  let jsonMock;

  beforeEach(() => {
    req = { body: {}, user: { _id: "user_id" }, params: {} };
    jsonMock = jest.fn();
    res = {
      status: jest.fn().mockReturnValue({ json: jsonMock }),
      json: jsonMock,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("sendMessage", () => {
    it("should return 400 if data is missing", async () => {
      await sendMessage(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Invalid data" });
    });

    // Add more test cases to cover other scenarios
  });

  describe("getMessages", () => {
    it("should retrieve messages for a chat", async () => {
      const mockMessages = [
        {
          _id: "message_id",
          content: "Hello",
          sender: "user_id",
          chat: "chat_id",
        },
      ];

      // Mock the behavior of Message.find()
      Message.find.mockResolvedValueOnce(mockMessages);

      // Mock the behavior of populate functions
      Message.populate.mockResolvedValueOnce(mockMessages);
      Chat.populate.mockResolvedValueOnce(mockMessages);

      req.params.chatId = "chat_id";

      await getMessages(req, res);

      expect(Message.find).toHaveBeenCalledWith({ chat: "chat_id" });
      expect(Message.populate).toHaveBeenCalledWith(
        mockMessages,
        expect.any(Object)
      );
      expect(Chat.populate).toHaveBeenCalledWith(
        mockMessages,
        expect.any(Object)
      );
      expect(res.json).toHaveBeenCalledWith(mockMessages);
    });

    // Add more test cases to cover other scenarios
  });
});
