import Gig from "../models/gig.model.js"
import createError from "../utils/createError.js"


export const createGig = async (req, res, next) => {
    if (!req.isSeller) return next(createError(403, "Only seller can create gig!"));

    const newGig = new Gig({
        userID: req.userID,
        ...req.body
    })

    try {
        const saveGig = await newGig.save();
        res.status(201).json(saveGig)
    } catch (error) {
        next(error);
    }
}

export const deleteGig = async (req, res, next) => {
    try {
        const gig = await Gig.findById(req.params.id)
        if (gig.userID !== req.userID)
            return next(createError(403, "You can delete only your gig!"))

        await Gig.findByIdAndDelete(req.params.id)
        res.status(200).send('Gig has been deleted')
    } catch (error) {
        next(error)
    }
}

export const getGig = async (req, res, next) => {
    try {
        res.send("test")
    } catch (error) {
        next(error)
    }
}

export const getGigs = async (req, res, next) => {
    try {
        res.send("test")
    } catch (error) {
        next(error)
    }
}