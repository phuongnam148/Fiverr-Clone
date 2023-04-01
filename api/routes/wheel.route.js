import express from "express";
import {
  deleteUser,
  getUsers,
  addUser,
} from "../controllers/wheel.controller.js";

const router = express.Router();

router.post("/", addUser);
router.get("/", getUsers);
router.delete("/:id", deleteUser);

export default router;
