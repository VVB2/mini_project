require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

//DB Connection
const connectDB = require('./config/database');
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on ${PORT}`));

//Express Middleware
app.use(express.json());

//Routes
app.use('/api/products', require('./routes/Products'));
