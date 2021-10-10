const express = require('express');
const cartController = require('../controllers/cartController');
const router = express.Router();

//@route - /api/cart
router.route('/').post(cartController.getProductsFromCart);

//@route - /api/cart/addToCart
router.route('/addToCart').post(cartController.addToCart);

//@route - /api/cart/removeFromCart
router.route('/removeFromCart').delete(cartController.removeFromCart);

module.exports = router;
