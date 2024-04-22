const User = require("../model/userModel.js")

//Create User with UNIQUE email address
module.exports.create = async(req, res) => {
    try{
        const userData = new User(req.body);    //New user
        const {email} = userData;               //Extract email

        const userExist = await User.findOne({email})   //Query
        if (userExist){                                 //Invalid
            return res.status(400).json({message: "Email is already in use."});
        }

        const savedUser = await userData.save();        //Valid
        res.status(200).json(savedUser);

    } catch (error) {
        res.status(500).json({error: "Internal Server Error."});
    }
};

//Find user by name, email
module.exports.fetch = async(req, res) => {
    try {
        const {email = "", name = ""} = req.body          //Query
        query.name = name
        query.email = email
        const users = await User.find(query);    
        if (users.length != 0){                 //No users
            return res.status(404).json({message: "User Not Found."});
        }
        
        res.status(200).json(users); 
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({message: "Internal Server error."});
    }
}
