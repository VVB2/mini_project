require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ArtifactsModel = require('./models/Artifacts.model.js');
//DB Connection
const db = require('./database');

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on ${PORT}`));

//Express Middleware
app.use(express.json());

//Routes
app.get('/', (req, res) => {
    ArtifactsModel.find({}, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    }).sort('-price');
});
