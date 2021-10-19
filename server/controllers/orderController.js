const orderModel = require('../models/Order.model');
const artifactModel = require('../models/Artifacts.model');
const cartModel = require('../models/Cart.model');

//get all Orders
exports.getProductsFromOrder = async (req, res, next) => {
    const { customerId } = req.body;
    const artifactInfo = [];
    try {
        const orderItem = await orderModel.find({
            customerId,
        });
        JSON.stringify(orderItem);
        for (const key in orderItem) {
            console.log(orderItem.orderItem);
            // const artifact = await artifactModel.find({
            //     title: orderItem.items[key].productName,
            // });
            // artifactInfo.push(artifact);
        }
        res.send({
            status: 201,
            orderItem,
            artifactInfo,
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
            console.log(orderData.items[key].productName);
            const artifact = await artifactModel.findOneAndUpdate(
                { title: orderData.items[key].productName },
                {
                    isSold: true,
                }
            );
            const cart = await cartModel.deleteOne({
                customerId: orderData.username,
                productName: orderData.items[key].productName,
            });
            console.log(artifact, cart);
        }
        res.send({
            status: 201,
            orderItem,
        });
    } catch (error) {
        next(error);
    }
};
