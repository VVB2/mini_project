const userModel = require('../models/User.model');
const ErrorResponse = require('../utils/errorResponse');

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

exports.forgotpassword = async (req, res, next) => {
    res.send('Forgot password route');
};

exports.resetpassword = async (req, res, next) => {
    res.send('Reset password route');
};

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({ success: true, token });
};
