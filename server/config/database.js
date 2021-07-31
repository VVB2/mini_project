const mongoose = require('mongoose');

//Connect to MongoDB
const connString = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(connString, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
        console.log('Database connection successful');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDB;
