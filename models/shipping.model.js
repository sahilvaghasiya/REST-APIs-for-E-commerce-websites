const mongoose = require('mongoose');

const shippingSchema = new mongoose.Schema({
    street:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    pinCode:{
        type: Number,
        minlength: 6,
        maxlength: 6,
        required: true
    },
    mobileNumber:{
        type: Number,
        minlength: 10,
        maxlength: 10,
        required: true
    },
    country:{
        type: String,
        required: true
    }
}, {timestamps: true}
);

module.exports = mongoose.model('Shipping', shippingSchema)