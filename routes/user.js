// const userCredentialModel = require("../models/userCredential.model.js");
const userController = require('../controllers/userController');
const authJwt  = require("../middleware/authJWT");
const verifySignUp = require('../middleware/verifySignUp')

module.exports = amazon => {
    const user = require("../controllers/userController");
  
    let router = require("express").Router();
  
    // Create a new user
    router.post("/userSignUp",[verifySignUp.checkDuplicateEmail], userController.create);

    
    //User logIn 
    router.post("/logIn", userController.signIn);

    
    // find user by firstName, or lastName or emailId
    router.get("/User", userController.findUserByDetails);

  
    // find all user by firstName, or lastName 
    router.get("/allUser", userController.findAllUsersByDetails);

  
    // Update a user with id
    router.put("/User/:id", userController.updateUserDetails);

  
    // Delete user
    router.delete("/User", userController.deleteUser);


    //logOut user
    router.post("/User/logOut/:sessionId", userController.logoutUser);


   
    router.get("/user", [authJwt.verifyToken], userController.userBoard);
  
    amazon.use('/api', router);
  };



  
  
   
  