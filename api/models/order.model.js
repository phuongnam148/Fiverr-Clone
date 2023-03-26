import mongoose from 'mongoose';
const { Schema } = mongoose;

const orderSchema = new Schema({
    gigID:{
        type:String,
        required: true
    },
    image:{
        type:String,
        required: true
    },
    title:{
        type:String,
        required: true
    },
    price:{
        type:Number,
        required: true
    },
    buyerID:{
        type:String,
        required: true
    },
    sellerID:{
        type:String,
        required: true
    },
    isCompleted:{
        type:String,
        default: false
    },
    payment_intent:{
        type:String,
        required: true
    },
}, {
    timestamps: true
});

export default mongoose.model('Order', orderSchema)