const productController = require('../controllers/productController');
module.exports = amazon => {
    const Product = require("../controllers/productController");
  
    let router = require("express").Router();
  
    // Create a product
    router.post("/newProduct", productController.create);
  
    // find product by name, or category, or subCategory
    router.get("/product", productController.findProductByDetails);
  
    // find all product by name, or category, or subCategory
    router.get("/allProducts", productController.findAllProductsByDetails);
  
    // Update a product with id
    router.put("/product/:id", productController.updateProductDetails);
  
    // Delete product
    router.delete("/product", productController.deleteProduct);
  
    amazon.use('/api', router);

}
