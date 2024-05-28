import express from "express";

import { protectRoute } from "../middleware/protectRoute.js";
import { getUsers } from "../controllers/userControllers.js";

const router = express.Router();

router.get("/:search", protectRoute, getUsers);
export default router;
