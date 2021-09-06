const ArtifactsModel = require('../models/Artifacts.model');
const artifactModel = require('../models/Artifacts.model');

// for pagination
exports.getAllProducts = async (req, res, next) => {
    const { page } = req.query;
    try {
        const artifacts = await artifactModel.find({
            id: { $gte: page * 10 - 9, $lte: page * 10 },
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

// show department wise products
exports.getLandingProducts = async (req, res, next) => {
    try {
        const departments = await artifactModel.find().distinct('department');
        const price = await artifactModel.aggregate([
            {
                $group: {
                    _id: '$department',
                    minPrice: { $min: '$price' },
                },
            },
            { $sort: { department: 1 } },
            { $limit: 12 },
        ]);
        const artifacts = [];
        for (const index in departments) {
            if (artifacts.length < 11) {
                const department = departments[index];
                artifacts.push(
                    await artifactModel.aggregate([
                        { $match: { department } },
                        { $limit: 1 },
                    ])
                );
            }
        }
        res.send({
            status: 400,
            data: artifacts,
            price,
        });
    } catch (error) {
        res.send({
            status: 401,
            data: error,
        });
    }
};

// all products department wise
exports.getAllproductsByDepartment = async (req, res, next) => {
    const { dept } = req.query;
    try {
        const artifacts = await ArtifactsModel.find({ department: dept });
        res.send({
            status: 400,
            products: artifacts,
        });
    } catch (error) {
        res.send({
            status: 401,
            error,
        });
    }
};

// get all product names for autocomplete
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

// get single product by name and similar products
exports.getProductsByTitle = async (req, res, next) => {
    try {
        const { title } = req.params;
        const artifacts = await artifactModel.find({ title });
        const { department } = artifacts[0];
        try {
            const similarArtifacts = await artifactModel.aggregate([
                { $match: { department } },
            ]);
            res.send({
                status: 400,
                productDetails: artifacts,
                similarProducts: similarArtifacts,
            });
        } catch (error) {
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
