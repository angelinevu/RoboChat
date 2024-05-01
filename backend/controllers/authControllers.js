export const signup = async(req, res) => {
    try {
       const {name, username, email, password, confirmPassword} = req.body 
    } catch (error) {
        
    }
}

export const signin = (req, res) => {
    res.send("signin")
}

export const signout = (req, res) => {
    res.send("signout")
}