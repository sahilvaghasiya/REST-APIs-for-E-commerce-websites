const db = require('../models');
const User = require('../models/user.model');

const checkDuplicateEmail = async (req, res, next) => {
    try {
        const user = await User.findOne({ emailId: req.body.emailId });
        if (user) {
            res.status(400).send({ message: "Failed! Email is already in use!" });
        } else {
            next();
        }
    } catch (err) {
        res.status(500).send({ message: err });
    }
}


const verifySignUp = { checkDuplicateEmail };

module.exports = verifySignUp;