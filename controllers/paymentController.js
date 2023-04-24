const Payment = require('../models/payment.model');
const Order = require('../models/order.model');
const Shipping = require('../models/shipping.model');

exports.create = async(req, res) => {
    if (!req.params.orderId || !req.params.shippingId || !req.body.totalAmount) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }
      
    const order = await Order.findById(req.params.orderId);
    const shipping = await Shipping.findById(req.params.shippingId);
    // console.log(req.params.orderId);
  const payment = new Payment({
    orderId: order._id,
    shippingId: shipping._id,
    totalAmount: req.body.totalAmount,
    paymentMethod: req.body.paymentMethod
  });
  

  payment
      .save()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Bill."
        });
      });
};

//find all Bill by paymentMethod
exports.findAllBillsByDetails = async (req, res) => {
    const { query } = req;
    try {
      const payment = await Payment.find({ paymentMethod: query.paymentMethod});
      res.json(payment);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Server error' });
    }
  };

//Update a Bill with id
exports.updateBillDetails = (req, res) => {
    const id = req.params.id;
    Payment.findByIdAndUpdate(id, req.body, { useFindAndModify: false },)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Bill with id=${id}. Maybe bill was not found!`
          });
        } else res.send({ message: "Bill was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Bill with id=" + id
        });
      });
  };

  // Delete Bill
  exports.deleteBill = async (req, res) => {
    const { id, paymentMethod } = req.query;
  
    const filter = {};
    if (id) {
      filter._id = id;
    }
    if (paymentMethod) {
      filter.paymentMethod = paymentMethod;
    }
    try {
      const result = await Payment.deleteOne(filter);
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Bill not found' });
      }
      res.json({ message: 'Bill deleted successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };
