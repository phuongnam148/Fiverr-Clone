import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    img: {
        type: String,
        require: false,
        default: '',
    },
    country: {
        type: String,
        require: true,
    },
    desc: {
        type: String,
        require: false,
    },
    phone: {
        type: String,
        require: false,
    },
    isSeller: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true
});

export default mongoose.model('User', userSchema)