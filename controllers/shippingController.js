const Shipping = require('../models/shipping.model');


// Create shipping address
exports.create = async (req, res) => {
    if (!req.body.street || !req.body.pinCode || !req.body.mobileNumber) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    const shipping = new Shipping({
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        pinCode: req.body.pinCode,
        mobileNumber: req.body.mobileNumber,
        country: req.body.country
    });

    shipping
        .save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the shipping address."
            });
        });
};

// Find all address using street or pinCode
exports.findAllShippingsByDetails = async (req, res) => {
    const { query } = req;
    try {
      const shipping = await Shipping.find({ $or: [{ street: query.street }, { pinCode: query.pinCode }] });
      res.json(shipping);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Server error' });
    }
  };



// update shipping address
exports.updateShippingDetails = (req, res) => {
    const id = req.params.id;
    Shipping.findByIdAndUpdate(id, req.body, { useFindAndModify: false },)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update address with id=${id}. Maybe Track was not found!`
                });
            } else res.send({ message: "address was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating address with id=" + id
            });
        });
};


// Delete shipping address
exports.deleteShipping = async (req, res) => {
  const { id, street, pinCode  } = req.query;

  const filter = {};
  if (id) {
    filter._id = id;
  }
  if (street) {
    filter.stret = street;
  }
  if (pinCode) {
    filter.pinCode = pinCode;
  }

  try {
    const result = await Shipping.deleteOne(filter);
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'shipping not found' });
    }
    res.json({ message: 'shipping deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};