import User from "../models/userModel.js"

//Get Users for sidebar DRAFT

export const getUsersForSidebar = async (req, res) => {
    try {

        const loggedInUserId = req.user._id     //Signed in user

        //CHANGE: select all other users (do not select password)
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password") 

        return res.status(200).json(filteredUsers)
    } catch (error) {
        console.log("Error in getUsersForSidebar: ", error.message)
        res.status(500).json({ error: "Internal server error" })
    }
}