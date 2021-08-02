const userModel = require('../models/User.model');
const bcrypt = require('bcryptjs');

// bcrypt.compare(
//     'B4c0//',
//     '$2a$10$zhtceCU0DbiZJozLwFz5ke1GYsLNjbLzk1fpNpG4e/y3VxvkHJ7Fu',
//     function (err, res) {
//         console.log(res);
//     }
// );

exports.createUser = (req, res, next) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash('B4c0//', salt, async (err, hash) => {
            const User = {
                username: req.body.username,
                email: req.body.email,
                password: hash,
            };
            try {
                const user = await new userModel(User).save();
                res.send({
                    status: 201,
                    data: user,
                });
            } catch (error) {
                res.send({
                    status: 200,
                    data: error,
                });
            }
        });
    });
};

exports.getUser = async (req, res, next) => {
    const { email } = req.query;
    const user = await userModel.find({ email });
    if (user) {
        try {
            res.send({
                status: 400,
                data: user,
            });
        } catch (error) {
            res.send({
                status: 404,
                data: error,
            });
        }
    } else {
        res.send({
            status: 404,
            message: 'User not found',
        });
    }
};
