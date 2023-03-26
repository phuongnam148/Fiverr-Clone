import mongoose from 'mongoose';
const { Schema } = mongoose;

const messageSchema = new Schema({
    id: {
        type: String,
        require: true,
        unique: true
    },
    sellerID: {
        type: String,
        require: true,
    },
    buyerID: {
        type: String,
        require: true,
    },
    readBySeller: {
        type: Boolean,
        require: true,
    },
    readByBuyer: {
        type: Boolean,
        require: true,
    },
    lastMessage: {
        type: String,
        require: false,
    },
}, {
    timestamps: true
});

export default mongoose.model('Message', messageSchema)