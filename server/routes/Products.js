const express = require('express');
const productsController = require('../controllers/productsController');
const router = express.Router();

//@route - /api/products
router.route('/').get(productsController.getAllProducts);

//@route - /api/products/id
router.route('/:id').get(productsController.getProductsById);

module.exports = router;
