import Order from "../models/order.model.js";
import Gig from "../models/gig.model.js";


export const createOrder = async (req, res, next) => {
    try {
        const gig = await Gig.findById(req.params.gigID)

        const newOrder = new Order({
            gigID: gig._id,
            image: gig.cover,
            title: gig.title,
            buyerID: req.userID,
            sellerID: gig.userID,
            price: gig.price,
            payment_intent: "temporary"
        })

        await newOrder.save();
        res.status(200).send("create order ok")
    } catch (error) {
        next(error)
    }

}
export const getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({
            ...(req.isSeller ? { sellerID: req.userID } : { buyerID: req.userID }),
            isCompleted: true
        })
        res.status(200).send(orders)

    } catch (error) {
        next(error)
    }
}