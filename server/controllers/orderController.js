const orderModel = require('../models/Order.model');
const artifactModel = require('../models/Artifacts.model');
const cartModel = require('../models/Cart.model');

exports.getProductsFromOrder = async (req, res, next) => {
    const { customerId } = req.body;
    try {
        const orderItem = await orderModel.find({
            customerId,
        });
        res.send({
            status: 201,
            orderItem,
        });
    } catch (error) {
        next(error);
    }
};

exports.getIndividualProduct = async (req, res, next) => {
    const { orderId } = req.body;
    try {
        const orderItem = await orderModel.find({
            orderId,
        });
        res.send({
            status: 201,
            orderItem,
        });
    } catch (error) {
        next(error);
    }
};

exports.createOrder = async (req, res, next) => {
    const { orderData } = req.body;
    try {
        const orderItem = await orderModel.create({
            shipping: orderData.shipping,
            orderId: orderData.orderId,
            items: orderData.items,
            expectedDelivery: orderData.expectedDelivery,
            customer: orderData.customer,
            stripePaymentId: orderData.stripePaymentId,
            customerId: orderData.username,
        });
        for (const key in orderData.items) {
            await artifactModel.findOneAndUpdate(
                { title: orderData.items[key].productName },
                {
                    isSold: true,
                }
            );
            await cartModel.deleteOne({
                customerId: orderData.username,
                productName: orderData.items[key].productName,
            });
        }
        res.send({
            status: 201,
            orderItem,
        });
    } catch (error) {
        next(error);
    }
};
