import mongoose from 'mongoose';
const { Schema } = mongoose;

const messageSchema = new Schema({
    conversationID: {
        type: String,
        required: true,
    },
    userID: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

export default mongoose.model('Message', messageSchema)