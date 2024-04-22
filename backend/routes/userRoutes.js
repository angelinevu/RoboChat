const express = require("express");
const route = express.Router();

const controller = require("../controller/userController")

route.post("/signup", controller.create);
route.get("/search", controller.fetch);
//route.delete("/delete", controller.delete);
//route.put("/update", controller.update)

module.exports = route;