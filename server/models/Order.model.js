const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    placedOn: {
        type: Date,
        default: Date.now(),
    },
    price: Number,
    shipTo: Object,
    orderId: String,
    productName: String,
    expectedDelivery: Date,
    deliveryStatus: {
        type: String,
        default: 'Ordered',
    },
});

const OrdersModel = mongoose.model('OrdersData', orderSchema);

module.exports = OrdersModel;
