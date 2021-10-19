const express = require('express');
const userPurchaseInfoController = require('../controllers/userPurchaseInfoController');
const router = express.Router();

//@route - /api/userPurchaseInfo/create
router.route('/create').post(userPurchaseInfoController.createUserPurchaseInfo);

//@route - /api/userPurchaseInfo
router.route('/').post(userPurchaseInfoController.getUserPurchaseInfo);

module.exports = router;
