const mongoose = require('mongoose');

const userPurchaseInfoSchema = mongoose.Schema({
    shipping: Object,
    customer: Object,
    customerId: String,
});

const UserPurchaseInfoModel = mongoose.model(
    'UserPurchaseInfoData',
    userPurchaseInfoSchema
);

module.exports = UserPurchaseInfoModel;
