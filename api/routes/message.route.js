import express from "express"
import { createMessage, getMessage } from "../controllers/message.controller.js";
import { verifyToken } from "../middleware/jwt.js";


const router = express.Router()

router.get('/:conversationID', verifyToken, getMessage)
router.post('/', verifyToken, createMessage)



export default router;
