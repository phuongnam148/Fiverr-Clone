import express from "express"
import { createMessage, getMessage, updateMessage } from "../controllers/message.controller.js";
import { verifyToken } from "../middleware/jwt.js";


const router = express.Router()

router.get('/', verifyToken, getMessage)
router.post('/', verifyToken, createMessage)
router.put('/:id', verifyToken, updateMessage)


export default router;
