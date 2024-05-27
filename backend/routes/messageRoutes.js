import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { sendMessage, getMessages } from "../controllers/messageControllers.js";

const router = express.Router();

router.get("/:chatId", protectRoute, getMessages);
router.post("/", protectRoute, sendMessage);

export default router;
