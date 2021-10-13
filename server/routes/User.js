const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

//@route - /api/auth/register
router.route('/register').post(userController.register);

//@route - /api/auth/login
router.route('/login').post(userController.login);

//@route - /api/auth/userDetails
router.route('/userDetails').post(userController.userDetails);

//@route - /api/auth/updateUser
router.route('/updateUser').put(userController.updateUser);

module.exports = router;
