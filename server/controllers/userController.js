const userModel = require('../models/User.model');
const ErrorResponse = require('../utils/errorResponse');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        const user = await userModel.create({
            username,
            email,
            password,
        });
        sendToken(user, 201, res);
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(
            new ErrorResponse('Please provide an email and password', 400)
        );
    }
    try {
        const user = await userModel.findOne({ email }).select('+password');
        if (!user) {
            return next(new ErrorResponse('Invalid credentials', 401));
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return next(new ErrorResponse('Invalid credentials', 401));
        }
        sendToken(user, 200, res);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({ success: true, token });
};

exports.userDetails = async (req, res, next) => {
    const { jwtEncodedUser } = req.body;
    const { id } = jwt.decode(jwtEncodedUser);
    try {
        const user = await userModel.findById(id);
        res.status(201).json({ success: true, user });
    } catch (error) {
        next(error);
    }
};
