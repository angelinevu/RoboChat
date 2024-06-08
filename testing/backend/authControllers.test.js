import bcrypt from "bcryptjs";
import {
  signup,
  signin,
  signout,
} from "../../backend/controllers/authControllers.js";
import User from "../../backend/models/userModel.js";
import generateTokenandSetCookie from "../../backend/utils/generateToken.js";

jest.mock("../backend/models/userModel");
jest.mock("bcryptjs");
jest.mock("../backend/utils/generateToken");

describe("Auth Controller", () => {
  let req;
  let res;
  let jsonMock;

  beforeEach(() => {
    req = { body: {} };
    jsonMock = jest.fn();
    res = {
      status: jest.fn().mockReturnValue({ json: jsonMock }),
      cookie: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("signup", () => {
    it("should return 400 if passwords do not match", async () => {
      req.body = {
        username: "test",
        fullName: "Test User",
        password: "12345",
        confirmPassword: "1234",
      };

      await signup(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({
        error: "Password fields do not match.",
      });
    });

    it("should return 400 if username already exists", async () => {
      req.body = {
        username: "test",
        fullName: "Test User",
        password: "12345",
        confirmPassword: "12345",
      };
      User.findOne.mockResolvedValue({ username: "test" });

      await signup(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({
        error: "Username already exists.",
      });
    });

    it("should create a new user if data is valid", async () => {
      req.body = {
        username: "test",
        fullName: "Test User",
        password: "12345",
        confirmPassword: "12345",
      };
      User.findOne.mockResolvedValue(null);
      bcrypt.genSalt.mockResolvedValue("salt");
      bcrypt.hash.mockResolvedValue("hashedPassword");
      const savedUser = {
        _id: "1", // Simulating MongoDB generated _id
        username: "test",
        fullName: "Test User",
        pic: "https://avatar.iran.liara.run/username?username=Test User",
        password: "hashedPassword",
      };
      User.prototype.save.mockResolvedValue(savedUser); // Mocking the save method to return saved user
      generateTokenandSetCookie.mockImplementation((userID, res) => {
        // Mock implementation of the function
        res.cookie("jwt", "mockedToken", { maxAge: 1000 });
      });

      await signup(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ username: "test" });
      expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
      expect(bcrypt.hash).toHaveBeenCalledWith("12345", "salt");
      expect(User).toHaveBeenCalledWith(
        expect.objectContaining({
          username: "test",
          fullName: "Test User",
          password: "hashedPassword",
        })
      );
      expect(User.prototype.save).toHaveBeenCalled();
      //expect(generateTokenandSetCookie).toHaveBeenCalledWith(
      //  "1",
      //  expect.any(Object)
      //); // Checking if it's called with any Object
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it("should return 500 if there is an internal server error", async () => {
      req.body = {
        username: "test",
        fullName: "Test User",
        password: "12345",
        confirmPassword: "12345",
      };
      User.findOne.mockRejectedValue(new Error("Database error"));

      await signup(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ error: "Internal Server Error" });
    });
  });

  // Remaining signin and signout test cases...
});
