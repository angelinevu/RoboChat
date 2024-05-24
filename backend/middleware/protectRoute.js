import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

//This file checks if the user is authorized for a given process

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      //No token provided
      return res
        .status(401)
        .json({ error: "Unauthorized - No Token Provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET); //Decode token

    if (!decoded) {
      //Invalid token
      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }

    const user = await User.findById(decoded.userID).select("-password"); //Find user
    if (!user) {
      //User not found
      return res.status(404).json({ error: "User not found" });
    }
    req.user = user; //User found!

    next(); //Calls next function
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    this.res.status(500).json({ error: "Internal server error" });
  }
};
