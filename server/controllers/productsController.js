const artifactModel = require('../models/Artifacts.model');

exports.getAllProducts = async (req, res, next) => {
    const { from, to } = req.query;
    try {
        const bootcamp = await artifactModel.find({
            id: { $gte: from, $lte: to },
        });
        res.send({
            status: 400,
            data: bootcamp,
        });
    } catch (error) {
        console.log(error);
        res.send({
            status: 401,
            data: error,
        });
    }
};

exports.getProductsById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const bootcamp = await artifactModel.find({ _id: id });
        res.send({
            status: 400,
            data: bootcamp,
        });
    } catch (error) {
        console.log(error);
        res.send({
            status: 401,
            data: error,
        });
    }
};
