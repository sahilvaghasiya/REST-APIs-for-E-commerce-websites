const Order = require('../models/order.model');
const User = require('../models/user.model');
const Product =require('../models/product.model');


// Create order
exports.create = async(req, res) => {
  if (!req.params.userId || !req.params.productId) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const user = await User.findById(req.params.userId);
  const product = await Product.findById(req.params.productId);

  const order = new Order({
    userId: user._id,
    productId: product._id,
    deliverType: req.body.deliverType,
    orderIssueDate: req.body.orderIssueDate,
    orderDeliveryDate: req.body.orderDeliveryDate,
    amount: req.body.amount,
  });
      console.log(req.body.amount);
  order
      .save()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the order."
        });
      });
};

//find all order by deliverType or orderIssueDate or orderDeliveryDate
exports.findAllOrdersByDetails = async (req, res) => {
  const { query } = req;
  try {
    const order = await Order.find({ $or: [{ deliverType: query.deliverType }, { orderIssueDate: query.orderIssueDate },
     { orderDeliveryDate: query.orderDeliveryDate }] });
    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
};

//Update a order with id
exports.updateOrderDetails = (req, res) => {
  const id = req.params.id;
  Order.findByIdAndUpdate(id, req.body, { useFindAndModify: false },)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update order with id=${id}. Maybe order was not found!`
        });
      } else res.send({ message: "order was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating order with id=" + id
      });
    });
};

// Delete product using deliverType or orderIssueDate or orderDeliveryDate
exports.deleteOrder = async (req, res) => {
  const { id, deliverType, orderIssueDate, orderDeliveryDate } = req.query;

  const filter = {};
  if (id) {
    filter._id = id;
  }
  if (deliverType) {
    filter.deliverType = deliverType;
  }
  if (orderIssueDate) {
    filter.orderIssueDate = orderIssueDate;
  }
  if (orderDeliveryDate) {
    filter.orderDeliveryDate = orderDeliveryDate;
  }

  try {
    const result = await Order.deleteOne(filter);
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
