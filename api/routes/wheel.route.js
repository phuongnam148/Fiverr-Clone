import express from "express";
import {
  deleteUser,
  getUsers,
  addUser,
  updateTrungThuong,
  updateTrungThuongFalse,
} from "../controllers/wheel.controller.js";

const router = express.Router();

router.post("/", addUser);
router.get("/", getUsers);
router.delete("/:id", deleteUser);
router.put("/:id", updateTrungThuong);
router.put("/trungthuong/:id", updateTrungThuongFalse);

export default router;
