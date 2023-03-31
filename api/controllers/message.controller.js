import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";

export const getMessage = async (req, res, next) => {
    try {
        const message = await Message.find({ conversationID: req.params.id })
        res.status(200).send(message)

    } catch (error) {
        next(error)
    }
}

export const createMessage = async (req, res, next) => {
    const newMessage = new Message({
        conversationID: req.body.conversationID,
        userID: req.userID,
        desc: req.body.desc
    })
    try {
        const saveMessage = await newMessage.save()

        // update Conversation
        await Conversation.findOneAndUpdate(
            { id: req.body.conversationID },
            {
                $set: {
                    readBySeller: req.isSeller,
                    readByBuyer: !req.isSeller,
                    lastMessage: req.body.desc
                }
            },
            {
                new: true
            })

        res.status(201).send(saveMessage)
    } catch (error) {
        next(error)
    }
}

export const updateMessage = async (req, res, next) => {
    try {
        // const updateConversation = await Conversation.findOneAndUpdate(
        //     { id: req.params.id },
        //     {
        //         $set: {
        //             // readBySeller: req.isSeller,
        //             // readByBuyer: !req.isSeller,
        //             ...(req.isSeller ? { readBySeller: true } : { readByBuyer: true }),
        //         }
        //     },
        //     { new: true }
        // )  //  return new conversation

        // res.status(200).send(updateConversation)

    } catch (error) {
        next(error)
    }
}