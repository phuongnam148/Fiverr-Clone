import Conversation from "../models/conversation.model.js";
import createError from "../utils/createError.js";
export const getConversations = async (req, res, next) => {
    try {
        const conversations = await
            Conversation.find(req.isSeller ? { sellerID: req.userID } : { buyerID: req.userID }).sort({ updatedAt: -1 })
        res.status(200).send(conversations)

    } catch (error) {
        next(error)
    }
}

export const createConversation = async (req, res, next) => {
    try {
        const newConversation = new Conversation({
            id: req.isSeller ? (req.userID + req.body.to) : (req.body.to + req.userID),
            sellerID: req.isSeller ? req.userID : req.body.to,
            buyerID: req.isSeller ? req.body.to : req.userID,
            readBySeller: req.isSeller,
            readByBuyer: !req.isSeller,
        })
        const saveConversation = await newConversation.save()
        res.status(201).send(saveConversation)
    } catch (error) {
        next(error)
    }
}
export const getSingleConversations = async (req, res, next) => {
    try {
        const conversation = await Conversation.findOne({ id: req.params.id })
        if (!conversation) return next(createError(404, 'Not found!'))
        res.status(200).send(conversation)
    } catch (error) {
        next(error)
    }
}
export const updateConversation = async (req, res, next) => {
    try {
        const updateConversation = await Conversation.findOneAndUpdate(
            { id: req.params.id },
            {
                $set: {
                    // readBySeller: req.isSeller,
                    // readByBuyer: !req.isSeller,
                    ...(req.isSeller ? { readBySeller: true } : { readByBuyer: true }),
                }
            },
            { new: true }
        )  //  return new conversation

        res.status(200).send(updateConversation)

    } catch (error) {
        next(error)
    }
}