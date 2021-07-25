const mongoose = require('mongoose');
// const ArtifactsModel = require('./models/Artifacts.model');
// const data = require('./Data.json');

//Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
});

const db = mongoose.connection;

// const artifactsData = [];

// for (const key in data) {
//     const review = Math.floor(Math.random() * 3 + 3);
//     artifactsData.push({
//         accessionYear: data[key].accessionYear,
//         additionalImages: data[key].additionalImages,
//         artistName: data[key].artistName,
//         artistWikidata: data[key].artistWikidata,
//         classification: data[key].classification,
//         country: data[key].country,
//         creditLine: data[key].creditLine,
//         department: data[key].department,
//         id: data[key].id,
//         medium: data[key].medium,
//         objectDate: data[key].objectDate,
//         price: data[key].price,
//         title: data[key].title,
//         coverImage: data[key].coverImage,
//         isSold: data[key].is_sold,
//         measurements: data[key].measurements,
//         rating: review,
//     });
// }

//Successful Connection
db.on('connected', function () {
    console.log('Database is connected successfully');
    // ArtifactsModel.insertMany(artifactsData)
    //     .then(() => {
    //         console.log('Data Inserted');
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });
});

//Disconnection
db.on('disconnected', function () {
    console.log('Database is disconnected successfully');
});

//Unsuccessful Connection
db.on('error', console.error.bind(console, 'connection error:'));
module.exports = db;
