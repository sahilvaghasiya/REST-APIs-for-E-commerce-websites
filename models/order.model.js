const mongoose = require('mongoose');
const User = require('./user.model');
const Product = require('./product.model');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: Product,
        required: true
    },
    deliverType:{
        type: String,
        enum:{
            values:['pickUp', 'onLocation'],
            default:'onLocation'
        }
    },
    orderIssueDate:{
        type: String,
        required: true
    },
    orderDeliveryDate:{
        type: String,
        required: true
    },
    amount:{
        type: String,
        required: true,
    }
    

},{timestamps:true}
);


module.exports = mongoose.model('Order', orderSchema);