const mongoose = require('mongoose');
const user = require('./user.model');

const sessionSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
        required: true,
    },
    jwt:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        enum: ['current', 'expire'],
        default: 'current',
        required: true
    },
    logInAt:{
        type: Date,
        required: true
    },
    expireAt:{
        type: Date,
        required: true
    },
    expiredAt:{
        type: Date,
        required: false
    }
    
},{timestamps:true}
);


module.exports = mongoose.model('Session', sessionSchema);


