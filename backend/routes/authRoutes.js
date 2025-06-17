import express from "express";
import { registerUser, loginUSer } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser); // For Normal User only
router.post("/login", loginUSer);
export default router;
