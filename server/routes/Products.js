const express = require('express');
const productsController = require('../controllers/productsController');
const router = express.Router();

//@route - /api/products
router.route('/').get(productsController.getAllProducts);

//@route - /api/products/landingPage
router.route('/landingPage').get(productsController.getLandingProducts);

//@route - /api/products/names
router.route('/names').get(productsController.getAllProductsNames);

//@route - /api/products/department
router.route('/department').get(productsController.getAllproductsByDepartment);

//@route - /api/products/productByName/name
router
    .route('/productByName/:title')
    .get(productsController.getProductsByTitle);

module.exports = router;
