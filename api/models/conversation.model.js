import mongoose from 'mongoose';
const { Schema } = mongoose;

const conversationSchema = new Schema({
    conversationID: {
        type: String,
        require: true,
    },
    userID: {
        type: String,
        require: true,
    },
    desc: {
        type: String,
        require: true,
    },
}, {
    timestamps: true
});

export default mongoose.model('Conversation', conversationSchema)