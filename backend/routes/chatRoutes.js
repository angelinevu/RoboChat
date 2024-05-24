import express from "express"

import { accessChat, fetchChats, createGroupChat, renameGroup, removeFromGroup, addToGroup } from "../controllers/chatControllers.js"
import { protectRoute } from "../middleware/protectRoute.js"

const router = express.Router();

router.route("/").post(protectRoute, accessChat);
router.route("/").get(protectRoute, fetchChats);
router.route("/group").post(protectRoute, createGroupChat);
router.route("/rename").put(protectRoute, renameGroup);
router.route("/groupremove").put(protectRoute, removeFromGroup);
router.route("/groupadd").put(protectRoute, addToGroup);

export default router