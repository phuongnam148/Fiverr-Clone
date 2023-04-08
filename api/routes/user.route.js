import express from "express";
import {
  deleteUser,
  getUser,
  getAllUser,
  getCurrentUser
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.delete("/:id", verifyToken, deleteUser);
router.get("/", verifyToken, getCurrentUser);
router.get("/all", verifyToken, getAllUser);
router.get("/:id", getUser);

export default router;
