require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

//DB Connection
const connectDB = require('./config/database');
connectDB();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server running on ${PORT}`));

process.on('unhandlededRejection', (error, promise) => {
    console.log(error);
    server.close(() => process.exit(1));
});
//Express Middleware
app.use(express.json());

//Routes
app.use('/api/products', require('./routes/Products'));
app.use('/api/auth', require('./routes/User'));
