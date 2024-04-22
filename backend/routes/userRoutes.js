const express = require("express");
const route = express.Router();

const controller = require("../controller/userController")

route.post("/signup", controller.signup);
route.get("/search", controller.search);
//route.delete("/delete", controller.delete);
//route.put("/update", controller.update)

module.exports = route;