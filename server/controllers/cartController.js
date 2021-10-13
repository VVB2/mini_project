const cartModel = require('../models/Cart.model');
const userModel = require('../models/User.model');
const artifactModel = require('../models/Artifacts.model');

//get all prdoucts in cart
exports.getProductsFromCart = async (req, res, next) => {
    const { customerId } = req.body;
    const artifactInfo = [];
    try {
        const cartItem = await cartModel.find({
            customerId,
        });
        for (const key in cartItem) {
            const artifact = await artifactModel.find({
                title: cartItem[key].productName,
            });
            artifactInfo.push(artifact);
        }
        res.send({
            status: 201,
            artifactInfo,
            cartItem,
        });
    } catch (error) {
        next(error);
    }
};

//add products to cart
exports.addToCart = async (req, res, next) => {
    const { customerId, productName } = req.body;
    try {
        const isInCart = await cartModel.find({
            customerId,
            productName,
        });
        const isUser = await userModel.find({
            _id: customerId,
        });
        if (isUser.length > 0) {
            if (isInCart.length > 0) {
                res.send({
                    status: 401,
                    data: 'Already in Cart',
                });
            } else {
                const cartItem = await cartModel.create({
                    customerId,
                    productName,
                });
                res.send({
                    status: 201,
                    data: cartItem,
                });
            }
        } else {
            res.send({
                status: 401,
                data: 'No user Found!',
            });
        }
    } catch (error) {
        next(error);
    }
};

//remove products from cart
exports.removeFromCart = async (req, res, next) => {
    const { customerId, productName } = req.body;
    try {
        await cartModel.deleteOne({
            customerId,
            productName,
        });
        res.send({
            status: 201,
            data: `Successfull deleted ${productName}`,
        });
    } catch (error) {
        next(error);
    }
};
