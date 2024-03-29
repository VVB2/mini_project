const mongoose = require('mongoose');

const artifactsSchema = mongoose.Schema({
    accessionYear: String,
    additionalImages: Array,
    artistName: String,
    classification: String,
    country: String,
    creditLine: String,
    department: String,
    id: Number,
    medium: String,
    objectDate: String,
    price: Number,
    title: String,
    coverImage: String,
    isSold: Boolean,
    measurements: Array,
    rating: Number,
    desc: String,
});

const ArtifactsModel = mongoose.model('ArtifactsData', artifactsSchema);

module.exports = ArtifactsModel;
