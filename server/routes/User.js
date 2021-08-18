const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

//@route - /api/register
router.route('/register').post(userController.register);

//@route - /api/login
router.route('/login').post(userController.login);

//@route - /api/forgotpassword
router.route('/forgotpassword').post(userController.forgotpassword);

//@route - /api/resetpassword/:resetToken
router.route('/resetpassword/:resetToken').put(userController.resetpassword);

module.exports = router;
