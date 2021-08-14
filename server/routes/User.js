const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

//@route - /api/createUser
router.route('/').post(userController.createUser);

router.route('/').get(userController.getUser);

module.exports = router;