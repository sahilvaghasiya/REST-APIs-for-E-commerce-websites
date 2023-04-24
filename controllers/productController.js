const Product = require('../models/product.model');
// const bodyParser = require('body-parser');
// const jwt = require('jsonwebtoken');


// Create a product
exports.create = async (req, res) => {
    if (!req.body.name || !req.body.category || !req.body.color || !req.body.price) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
        }

      const product = new Product({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        subCategory: req.body.subCategory,
        company: req.body.company,
        color: req.body.color,
        price: req.body.price,
        material: req.body.material,
        origin: req.body.origin
      });

      product
      .save()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the product."
        });
      });
};


// Find product by name or category or subcategory

exports.findProductByDetails = async (req, res) => {
  const { query } = req;
  try {
    const product = await Product.findOne({ $or: [{ name: query.name }, { category: query.category }, { subCategory: query.subCategory }] });
    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
};
  

// Find all product by name or category or subCategory

exports.findAllProductsByDetails = async (req, res) => {
  const { query } = req;
  try {
    const products = await Product.find({ $or: [{ name: query.name }, { category: query.category }, { subCategory: query.subCategory }] });
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
};


//Update product with ID

exports.updateProductDetails = (req, res) => {
  const id = req.params.id;
  Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false },)
  
    .then(data => {

      if (!data) {

        res.status(404).send({

          message: `Cannot update Track with id=${id}. Maybe Track was not found!`

        });

      } else res.send({ message: "Track was updated successfully." });

    })

    .catch(err => {

      res.status(500).send({

        message: "Error updating Track with id=" + id

      });

    });
};


//Delete Product

exports.deleteProduct = async (req, res) => {
  const { id, category, subCategory  } = req.query;

  const filter = {};
  if (id) {
    filter._id = id;
  }
  if (category) {
    filter.category = category;
  }
  if (subCategory) {
    filter.subCategory = subCategory;
  }

  try {
    const result = await Product.deleteOne(filter);
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};






