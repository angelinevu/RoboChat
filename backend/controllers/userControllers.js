import User from "../models/userModel.js";

//api/user/:search
//**********************************************************************************************************
//Get exact match of username; gets ID
export const getUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.findOne({
      _id: { $ne: loggedInUserId },
      username: req.params.search,
    }).select("-password");

    return res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getUsers controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
