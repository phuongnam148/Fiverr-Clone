import User from "../models/user.model.js";
import createError from "../utils/createError.js";


export const deleteUser = async (req, res, next) => {
    const user = await User.findById(req.params.id)

    if (req.userID !== user._id.toString()) {
        return next(createError(403, "You can delete only your account!"))
    }
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send('deleted!')
}

export const getCurrentUser = async (req, res, next) => {
    const user = await User.findById(req.userID)
    const { password, ...info } = user._doc
    res.status(200).send(info)  // send tat ca thong tin user tru password
}

export const getUser = async (req, res, next) => {
    const user = await User.findById(req.params.id)
    res.status(200).send(user)
}


export const getAllUser = async (req, res, next) => {
    const user = await User.find()
    res.status(200).send(user)
}

export const updateUser = async (req, res, next) => {
    try {
        await User.findOneAndUpdate(
            { _id: req.userID },
            {
                $set: {
                    img: req.body.img
                }
            })
        res.status(200).send("Avatar change")

    } catch (error) {
        next(error)
    }
}
