const shippingController = require('../controllers/shippingController');
module.exports = amazon => {

    let router = require("express").Router();
  
    // Create a shipping address
    router.post("/createAddress", shippingController.create);
  
    // find all address by street or pincode
    router.get("/allAddress", shippingController.findAllShippingsByDetails);
    
    // Update address
    router.put("/address/:id", shippingController.updateShippingDetails);
  
    // Delete address using id or pincode or street
    router.delete("/address", shippingController.deleteShipping);
  
    amazon.use('/api', router);
}