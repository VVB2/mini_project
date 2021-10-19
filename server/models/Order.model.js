const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    placedOn: {
        type: Date,
        default: Date.now(),
    },
    shipping: Object,
    customer: Object,
    orderId: String,
    items: Object,
    expectedDelivery: String,
    stripePaymentId: String,
    deliveryStatus: {
        type: String,
        default: 'Ordered',
    },
    customerId: String,
});

const OrdersModel = mongoose.model('OrdersData', orderSchema);

module.exports = OrdersModel;
