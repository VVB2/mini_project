const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    customerId: String,
    productName: String,
    createdOn: {
        type: Date,
        default: Date.now,
    },
});

const CartModel = mongoose.model('CartData', cartSchema);

module.exports = CartModel;
