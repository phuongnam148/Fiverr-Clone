import createError from "../utils/createError.js";
import Review from "../models/review.model.js";
import Gig from "../models/gig.model.js";


export const createReview = async (req, res, next) => {
    try {
        if (req.isSeller)
            return next(createError(403, "Sellers can't create a review!"))

        const newReview = new Review({
            userID: req.userID,
            gigID: req.body.gigID,
            desc: req.body.desc,
            star: req.body.star,
        })

        try {
            const review = await Review.findOne({
                userID: req.userID,
                gigID: req.body.gigID,
            })
            if (review) return next(createError(403, "You have already created a review for this gig!"));

            const savedReview = await newReview.save()

            await Gig.findByIdAndUpdate(req.body.gigID, { $inc: { totalStars: req.body.star, starNumber: 1 } })

            res.status(201).send(savedReview)


        } catch (error) {
            next(error)
        }

    } catch (error) {
        next(error);
    }

}

export const getReviews = async (req, res, next) => {
    try {
        const reviews = await Review.find({ gigID: req.params.gigID })
        res.status(200).send(reviews)
    } catch (error) {
        next(error);
    }
}

export const deleteReview = async (req, res, next) => {
    try {

    } catch (error) {
        next(error);
    }
    res.send("test")
}