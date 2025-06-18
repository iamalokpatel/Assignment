import express from "express";
import { createUser, getUsers } from "../controllers/userController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { allowRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, allowRoles("admin"), createUser);
router.get("/", verifyToken, allowRoles("admin"), getUsers);

export default router;
