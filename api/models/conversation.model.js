import mongoose from 'mongoose';
const { Schema } = mongoose;

const conversationSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    sellerID: {
        type: String,
        required: true,
    },
    buyerID: {
        type: String,
        required: true,
    },
    readBySeller: {
        type: Boolean,
        required: true,
    },
    readByBuyer: {
        type: Boolean,
        required: true,
    },
    lastMessage: {
        type: String,
        required: false,
    },
},
    {
        timestamps: true,
    }
);

export default mongoose.model('Conversation', conversationSchema)