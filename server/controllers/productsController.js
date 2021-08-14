const artifactModel = require('../models/Artifacts.model');

exports.getAllProducts = async (req, res, next) => {
    const { from, to } = req.query;
    try {
        const artifacts = await artifactModel.find({
            id: { $gte: from, $lte: to },
        });
        res.send({
            status: 400,
            data: artifacts,
        });
    } catch (error) {
        res.send({
            status: 401,
            data: error,
        });
    }
};

exports.getAllProductsNames = async (req, res, next) => {
    const artifacts = await artifactModel.find();
    const products = [];
    for (const index in artifacts) {
        products.push({
            name: artifacts[index].title,
            id: artifacts[index]._id,
        });
    }
    res.send({
        status: 400,
        data: products,
    });
};

exports.getProductsById = async (req, res, next) => {
    try {
        const { title } = req.params;
        const artifacts = await artifactModel.find({ title });
        const { department, _id } = artifacts[0];
        try {
            const similarArtifacts = await artifactModel.aggregate([
                { $match: { department } },
            ]);
            res.send({
                status: 400,
                data: { artifacts, similarArtifacts },
            });
        } catch (error) {
            console.log(error);
            res.send({
                status: 401,
                error,
            });
        }
    } catch (error) {
        console.log(error);
        res.send({
            status: 401,
            error,
        });
    }
};
