const bcryptjs = require("bcryptjs");
const User = require("../model/userModel.js")

//Create User with UNIQUE email address
module.exports.register = async(req, res) => {
    try{
        userData = new User(req.body);    //New user
        const {email} = userData;               //Extract email

        const userExist = await User.findOne({email})   //Query
        if (userExist){                                 //Invalid
            return res.status(400).json({message: "Email is already in use."});
        }

        //BCRYPT PASSWORD
        //const {password} = userData
        //const numSaltRounds = 8;
        //userData = bcryptjs.hash(password, numSaltRounds);

        const savedUser = await userData.save();        //Valid
        res.status(200).json(savedUser);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({error: "Internal Server Error."});
    }
};


//Find user by name
module.exports.search = async(req, res) => {
    try {
        const {name = ""} = req.body;            //Get name
        const users = await User.find({name});    
        if (users.length == 0){                 //No users
            console.log("User not Found.");
            return res.status(404).json({message: "User Not Found."});
        }

        console.log(`Users Found: ${users.length}`);
        return res.status(200).json(users); 
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({message: "Internal Server error."});
    }
}
