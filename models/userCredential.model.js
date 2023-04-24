const mongoose = require('mongoose');
const user = require('./user.model');

const userCredentialSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    password:{
        type: String,
        required: true,
    //     minlength: 8,
    //     maxlength: 12
    }
}, {timestamps: true}
);

module.exports = mongoose.model('userCredential', userCredentialSchema);