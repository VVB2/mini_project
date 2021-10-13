const express = require('express');
const orderController = require('../controllers/orderController');
const router = express.Router();

//@route - /api/order/createOrder
router.route('/createOrder').post(orderController.createOrder);

//@route - /api/order
router.route('/').post(orderController.getProductsFromOrder);

//@route - /api/order
// router.route('/').put(cartController.addToCart);

module.exports = router;
