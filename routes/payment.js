const paymentController = require('../controllers/paymentController');

module.exports = amazon => {
    const payment = require('../models/payment.model');
    let router = require('express').Router();

    // Create a bill
    router.post("/newBill/order/:orderId/shipping/:shippingId", paymentController.create);
  
    // find all Bill by paymentMethod
    router.get("/allBills", paymentController.findAllBillsByDetails);
  
    // Update a Bill with id
    router.put("/bill/:id", paymentController.updateBillDetails);
  
    // Delete Bill
    router.delete("/bill", paymentController.deleteBill);
  
    amazon.use('/api', router);

}