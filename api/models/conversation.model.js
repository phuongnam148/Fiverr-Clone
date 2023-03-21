import mongoose from 'mongoose';
const { Schema } = mongoose;

const conversationSchema = new Schema({
    conversationId: {
        type: String,
        require: true,
    },
    userId: {
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