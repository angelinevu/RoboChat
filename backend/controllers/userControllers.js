import User from "../models/userModel.js"

export const getUsers = async (req, res) => {
    try {
        const loggedInUserId = req.user._id     //Signed in user

        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password") 
        return res.status(200).json(filteredUsers)
    } catch (error) {
        console.log("Error in getUsersForSidebar: ", error.message)
        res.status(500).json({ error: "Internal server error" })
    }
}
