import express from "express"
import { deleteUser,getUser,getAllUser } from "../controllers/user.controller.js"
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router()

router.delete('/:id', verifyToken, deleteUser)
router.get('/', verifyToken, getAllUser)
router.get('/:id', verifyToken, getUser)

export default router;
