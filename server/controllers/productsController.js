const artifactModel = require('../models/Artifacts.model');

exports.getAllProducts = async (req, res, next) => {
    const { from, to } = req.query;
    try {
        if (from && to) {
            const artifacts = await artifactModel.find({
                id: { $gte: from, $lte: to },
            });
            res.send({
                status: 400,
                data: artifacts,
            });
        } else {
            const artifacts = await artifactModel.find();
            const names = [];
            for (const index in artifacts) {
                names.push(artifacts[index].title);
            }
            res.send({
                status: 400,
                data: names,
            });
        }
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
        const artifacts = await artifactModel.find({ _id: id });
        res.send({
            status: 400,
            data: artifacts,
        });
    } catch (error) {
        console.log(error);
        res.send({
            status: 401,
            data: error,
        });
    }
};
