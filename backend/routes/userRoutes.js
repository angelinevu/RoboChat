const express = require("express");
const route = express.Router();

const controller = require("../controller/userController")

route.post("/register", controller.register);
//route.post('/login', login);
//route.post('/logout', logout);
route.get("/search", controller.search);
//route.delete("/delete", controller.delete);
//route.put("/update", controller.update)

module.exports = route;