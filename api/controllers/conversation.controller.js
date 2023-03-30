import Conversation from "../models/conversation.model.js";
export const getConversations = async (req, res, next) => {
    try {
        const conversations = await Conversation.find(req.isSeller ? { sellerID: req.userID } : { buyerID: req.userID })
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
        res.status(200).send(conversation)
    } catch (error) {
        next(error)
    }
}
export const updateConversation = async (req, res, next) => {
    try {
        const updateConversation = await Conversation.findOneAndUpdate({ id: req.params.id }, {
            $ser: {
                // readBySeller: req.isSeller,
                // readByBuyer: !req.isSeller,
                ...(req.isSeller ? { readBySeller: true } : { readByBuyer: true }),
            }
        }, { new: true })  // dùng để return new conversation

        res.status(200).send(updateConversation)

    } catch (error) {
        next(error)
    }
}