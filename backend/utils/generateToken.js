//This file generates a JWT for authentification

import jwt from "jsonwebtoken"

const generateTokenandSetCookie = (userID, res) => {
    const token = jwt.sign({ userID }, process.env.JWT_SECRET, {
        expiresIn: "15d"
    })

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,   //milliseconds
        httpOnly: true,                     //prevent XSS attacks,
        sameSite: "strict",                 //CSRF attacks
        secure: process.env.NODE_ENV != "development"
    })
}

export default generateTokenandSetCookie