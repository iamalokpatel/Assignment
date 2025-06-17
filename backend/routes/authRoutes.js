import express from "express";
import { registerUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser); // For Normal User only

export default router;
