//This file details /api/auth route endpoints

import express from "express";
import { signup, signin, signout } from "../controllers/authControllers.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);

export default router;
