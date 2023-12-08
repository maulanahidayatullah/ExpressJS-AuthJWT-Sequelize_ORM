const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models/index');
const UserModel = require('../models').UserModel
require('dotenv').config();
const { ACCESS_TOKEN } = process.env;


module.exports = {
    signup: async (req, res) => {
        try {
            return UserModel
                .create({
                    name: req.body.name,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 8)
                }).then(user => {
                    res.status(200).send({
                        auth: true,
                        message: "User registered successfully!",
                        data: user,
                    });
                }).catch(err => {
                    res.status(500).send({
                        auth: false,
                        message: "Error",
                        errors: err
                    });
                })
        } catch (error) {
            res.status(500).send({
                auth: false,
                message: "Error",
                errors: err
            });
        }
    },

    signin: async (req, res) => {
        try {
            return UserModel
                .findOne({
                    where: {
                        name: req.body.name
                    }
                }).then(user => {
                    if (!user) {
                        return res.status(400).json({ message: "Invalid Username or Password !", statuscode: 400 });
                    }

                    let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

                    if (!passwordIsValid) {
                        return res.status(400).json({ message: "Invalid Username or Password !", statuscode: 400 });
                    }

                    let token = 'Bearer ' + jwt.sign({
                        id: user.id
                    }, process.env.ACCESS_TOKEN, {
                        expiresIn: 86400
                    });

                    return res.status(200).json({ message: "Login Successful !", accessToken: token, statuscode: 200 });
                }).catch(err => {
                    return res.status(500).json({ message: "Internal Server Error", statuscode: 500 });
                });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error, message: "Internal Server Error", statuscode: 500 });
        }
    }
}