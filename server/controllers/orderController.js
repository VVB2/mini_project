const orderModel = require('../models/Order.model');
const artifactModel = require('../models/Artifacts.model');

//get all Orders
exports.getProductsFromOrder = async (req, res, next) => {
    const { customerId } = req.body;
    try {
        const orderItem = await orderModel.find({
            customerId,
        });
        for (const key in orderItem) {
            const artifact = await artifactModel.find({
                title: orderItem[key].productName,
            });
            artifactInfo.push(artifact);
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
    const { price, shipTo, orderId, productName, expectedDelivery } = req.body;
    try {
        const orderItem = await orderModel.create({
            price,
            shipTo,
            orderId,
            productName,
            expectedDelivery,
        });
        res.send({
            status: 201,
            orderItem,
        });
    } catch (error) {
        next(error);
    }
};

//update order deliverystatus
// exports.removeFromCart = async (req, res, next) => {
//     const { customerId, productName } = req.body;
//     try {
//         await cartModel.deleteOne({
//             customerId,
//             productName,
//         });
//         res.send({
//             status: 201,
//             data: `Successfull deleted ${productName}`,
//         });
//     } catch (error) {
//         next(error);
//     }
// };
