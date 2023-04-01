import express from "express"
import { getOrders, intent, confirm } from "../controllers/order.controller.js";
import { verifyToken } from "../middleware/jwt.js";


const router = express.Router()

// router.post('/:gigID', verifyToken, createOrder)
router.get('/', verifyToken, getOrders)

router.post('/create-payment-intent/:gigID', verifyToken, intent)
router.put('/', verifyToken, confirm)


export default router;
