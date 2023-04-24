const User = require('../models/user.model');
const {DateTime} = require('luxon');
// const db = require('../models');
const Session= require('../models/session.model');
// const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.config');
const UserCredential = require('../models/userCredential.model');
const user = require('../routes/user');
const dbConfig = require('../config/db.config');



// TO create a user
exports.create = async (req, res) => {
  if (!req.body.firstName || !req.body.lastName || !req.body.emailId || !req.body.password) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    emailId: req.body.emailId,
  });
  try {
    await user.save();
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the user."
    });
    return;
  }
  const userCredential = new UserCredential({
    userId: user._id,
    password: bcrypt.hashSync(req.body.password)
  });
  try {
    await userCredential.save();
  } catch (err) {
    await User.findByIdAndDelete(user._id);
    res.status(500).send({
      message: err.message || "Some error occurred while creating the user credential."
    });
    return;
  }
  // const token = jwt.sign({ userId: user._id }, authConfig.secret);
  res.send({
    _id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    emailId: user.emailId,
    // token: token
  });
};






// User signIn 
exports.signIn = async (req, res) => {
  // console.log(req.body);

      const user = await User.findOne({ emailId: req.body.emailId});
      if (!user) {
          return res.status(404).send({ message: "User Not found." });
      }
      const passwordCheck = await UserCredential.findOne({userId : user._id});
      console.log(passwordCheck);
      if (!passwordCheck){
          return res.status(400).json({message: " Password"});
          }
      const passwordIsValid = await bcrypt.compare(req.body.password, passwordCheck.password);
      if (!passwordIsValid) {
          return res.status(401).send({
              accessToken: null,
              message: "Invalid Password!"
          }
          );
      } 
      else{
        let token = jwt.sign({userId: user._id}, authConfig.secret,{expiresIn: 84600});
        const session = new Session({
          userId: user._id,
          jwt: token,
          status: "current",
          logInAt: DateTime.utc(),
          expireAt: DateTime.utc().plus({hours: 24})
        });

        // console.log(session);
        session
        .save(session)
        .then(data => {
          res.send({userId: user._id,
                emailId: user.emailId,
                // jwt: token,
                status: req.body.status
              });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the user."
          });
        });
      // const token = jwt.sign({user: { id: user.id, firstName: user.firstName, emailId: user.emailId}}, authConfig.secret,  {expiresIn: 86400 });     
      // res.status(200).send({
      //     id: user._id,
      //     firstName: user.firstName,
      //     emailId: user.emailId,
      //     accessToken: token
      // });
  // };
  // catch (err) {
  //     console.log(err);
  //     res.status(500).send({ message: err });
  // }
  };
};

  

// find user by firstName, lastName or emailId
exports.findUserByDetails = async (req, res) => {
  const { query } = req;
  try {
    const user = await User.findOne({ $or: [{ firstName: query.firstName }, { lastName: query.lastName }, { emailId: query.emailId }] });
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
};



// Find all user by firstName or lastName 
exports.findAllUsersByDetails = async (req, res) => {
  const { query } = req;
  try {
    const users = await User.find({ $or: [{ firstName: query.firstName }, { lastName: query.lastName }] });
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
};


// Update user's firstname or lastname or emailid using id 
exports.updateUserDetails = async (req, res) => {
  const id = req.params.id;
  const { firstName, lastName, emailId } = req.body; 

  try {
    const user = await User.findByIdAndUpdate(id, { firstName, lastName, emailId }, { new: true });
    if (!user) {
      return res.status(404).send({ message: `Cannot update user with id=${id}. Maybe user was not found!` });
    }
    res.send({ message: "User details were updated successfully.", data: user });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error updating user with id=" + id });
  }
};


// Delete a user
exports.deleteUser = async (req, res) => {
  const { id, firstName, lastName, emailId } = req.query;

  const filter = {};
  if (id) {
    filter._id = id;
  }
  if (firstName) {
    filter.firstName = firstName;
  }
  if (lastName) {
    filter.lastName = lastName;
  }
  if (emailId) {
    filter.emailId = emailId;
  }

  try {
    const result = await User.deleteOne(filter);
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// logOut user
exports.logoutUser = async (req, res) => {
    const sessionId = req.params.sessionId;
    const session = await Session.findOne({ _id: sessionId });

    if (!session) {
      return res.status(404).send({ message: 'Session not found' });
    }
    session.status = 'expire';
    await session.save();
    const user = await User.findOneAndUpdate(
      { _id: session.userId },
      { $set: { sessionId: null } },
      { new: true }
    );

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    try {
      await req.session.destroy();
      res.status(200).send({ message: 'Logout successful' });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Internal server error' });
    }
  }
  // catch (err) {
  //   console.error(err);
  //   res.status(500).send({ message: 'Internal server error' });
  // }
// };



//verify jwt token for user
exports.userBoard = async (req, res) => {
  const userId = req.body.userId;
  const user = await User.findById(userId);
  console.log(req.body);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json({ user });
}