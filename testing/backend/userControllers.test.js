import { getUsers } from "../../backend/controllers/userControllers";
import User from "../../backend/models/userModel";

jest.mock("../backend/models/userModel");

describe("User Controller", () => {
  let req;
  let res;
  let jsonMock;

  beforeEach(() => {
    req = {
      user: { _id: "loggedInUserId" },
      params: { search: "testUser" },
    };
    jsonMock = jest.fn();
    res = {
      status: jest.fn().mockReturnValue({ json: jsonMock }),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a user object if found", async () => {
    const foundUser = {
      _id: "foundUserId",
      username: "testUser",
      email: "test@example.com",
    };
    // Mocking the findOne method to resolve with a test user object
    User.findOne.mockResolvedValueOnce(foundUser);

    await getUsers(req, res);

    expect(User.findOne).toHaveBeenCalledWith({
      _id: { $ne: "loggedInUserId" },
      username: "testUser",
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(foundUser);
  });
  /*
  it("should return 500 if there is an internal server error", async () => {
    // Mocking the findOne method to reject with a database error
    User.findOne.mockRejectedValueOnce(new Error("Database error"));

    await getUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({ error: "Internal server error" });
  });*/
});
