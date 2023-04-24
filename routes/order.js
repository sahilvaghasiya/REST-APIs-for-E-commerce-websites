const orderController = require('../controllers/orderController');
module.exports = amazon => {
    const Order = require('../models/order.model');
    let router = require('express').Router();

    // Create a order
    router.post("/newOrder/user/:userId/product/:productId", orderController.create);
  
    // find all order by deliverType or orderIssueDate or orderDeliveryDate
    router.get("/allOrders", orderController.findAllOrdersByDetails);
  
    // Update a order with id
    router.put("/order/:id", orderController.updateOrderDetails);
  
    // Delete product
    router.delete("/order", orderController.deleteOrder);
  
    amazon.use('/api', router);

}