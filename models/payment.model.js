const mongoose = require('mongoose');
const shipping = require('./shipping.model');
const order = require('./order.model');

const paymentSchema = new mongoose.Schema({
    orderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order',
        required: true
    },
    shippingId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'shipping',
        required: true
    },
    totalAmount:{
        type: Number,
        required: true
    },
    paymentMethod:{
        type: String,
        enum:{
            values: ["creditCard", "debitCard", "UPI"],
            message: "please select valid paymentMethod"
        },
        required: true
    }
}, {timestamps: true}
);


module.exports = mongoose.model('Payment', paymentSchema);