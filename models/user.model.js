const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        required: [true, "Email required"],
        lowercase: true,
        unique: true,
        match: [/.+\@.+\..+/, "Enter valid emailId"]
    },
    },
    { timestamps: true }
);



const User = mongoose.model('User', userSchema);
module.exports = User;

