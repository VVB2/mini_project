const UserPurchaseInfoModel = require('../models/UserPurchaseInfo.model');

exports.getUserPurchaseInfo = async (req, res, next) => {
    const { customerId } = req.body;
    try {
        const userPurchaseInfo = await UserPurchaseInfoModel.find({
            customerId,
        });
        res.send({
            status: 201,
            userPurchaseInfo,
        });
    } catch (error) {
        next(error);
    }
};

exports.createUserPurchaseInfo = async (req, res, next) => {
    const userPurchaseInfoData = req.body;
    try {
        const checkSameAddress = await UserPurchaseInfoModel.find({
            shipping: userPurchaseInfoData.shipping,
            customer: userPurchaseInfoData.customer,
            customerId: userPurchaseInfoData.customerId,
        });
        if (checkSameAddress.length === 0) {
            const userPurchaseInfo = await UserPurchaseInfoModel.create({
                shipping: userPurchaseInfoData.shipping,
                customer: userPurchaseInfoData.customer,
                customerId: userPurchaseInfoData.customerId,
            });
            res.send({
                status: 201,
                userPurchaseInfo,
                checkSameAddress,
            });
        } else {
            res.send({
                status: 201,
                data: 'Already in database',
            });
        }
    } catch (error) {
        next(error);
    }
};
