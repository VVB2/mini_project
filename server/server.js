require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const errorHandler = require('./middleware/error');

app.use(cors());

//DB Connection
const connectDB = require('./config/database');
connectDB();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server running on ${PORT}`));

//Express Middleware
app.use(express.json());

//Routes
app.use('/api/products', require('./routes/Products'));
app.use('/api/auth', require('./routes/User'));
app.use('/api/cart', require('./routes/Cart'));
app.use('/api/order', require('./routes/Order'));
app.use('/api/userPurchaseInfo', require('./routes/UserPurchaseInfo'));

app.use(errorHandler);

process.on('unhandlededRejection', (error, data) => {
    console.log(error);
    server.close(() => process.exit(1));
});
