const express = require('express');
const productsController = require('../controllers/productsController');
const router = express.Router();

//@route - /api/products
router.route('/').get(productsController.getAllProducts);

//@route - /api/products/product/id
router.route('/product/:id').get(productsController.getProductsById);

module.exports = router;
