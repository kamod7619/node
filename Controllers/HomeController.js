const createError = require('http-errors');
const mongoose = require('mongoose');
const path = require('path');
// const result = require("../Helpers/globalHelper");
const db = require("../models"); // models path depend on your structure
const User = db.user;
var Title = 'Home Page'

module.exports = {
    index: async(req, res, next) => {
        try {
            const title = req.query.title;
            var condition = title ? {
                title: {
                    [Op.like]: `%${title}%`
                }
            } : null;
            User.findAll({ where: condition })
                .then(data => {
                    // console.log('>>>>>', JSON.stringify(data))
                    // res.send({ status: true, message: "all users.", data: data });
                    return res.render('index', { data: JSON.stringify(data) });
                })
                .catch(err => {
                    res.status(500).send({ status: false, message: err.message || "Some error occurred while retrieving users." });
                });
        } catch (error) {
            console.log(error.message);
        }
    },

    getAllUsers: async(req, res, next) => {
        try {
            await User.findAll({}).then(data => {
                    res.send({ status: true, message: "all users.", data: data });
                })
                .catch(err => {
                    res.status(500).send({ status: false, message: err.message || "Some error occurred while retrieving users." });
                });
        } catch (error) {
            console.log(error.message);
        }
    },

    createNewUser: async(req, res, next) => {

        try {
            const user = new User(req.body);
            // const result = await user.save();
            // res.send(result);
            await user.save().then(data => {
                    res.send({ status: true, message: "create user successfully.", data: data });
                })
                .catch(err => {
                    res.status(500).send({ status: false, message: err.message || "Some error occurred while create user." });
                });
        } catch (error) {
            console.log(error.message);
            if (error.name === 'ValidationError') {
                next(createError(422, error.message));
                return;
            }
            next(error);
        }
    },

    findUserById: async(req, res, next) => {
        const id = req.params.id;
        try {
            var condition = { id: id }
            const user = await User.findAll({ where: condition });
            if (!(user.length > 0)) {
                throw createError(404, 'User does not exist.');
            }
            await User.findAll({ where: condition }).then(data => {
                    res.send({ status: true, message: "get user successfully.", data: data });
                })
                .catch(err => {
                    res.status(500).send({ status: false, message: err.message || "Some error occurred while get user by id." });
                });
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    },

    updateAUser: async(req, res, next) => {
        try {
            const id = req.params.id;
            const updates = req.body;
            const options = { new: true };

            const result = await User.findByIdAndUpdate(id, updates, options);
            if (!result) {
                throw createError(404, 'User does not exist');
            }
            res.send(result);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    },

    deleteAUser: async(req, res, next) => {
        const id = req.params.id;
        try {
            const result = await User.findByIdAndDelete(id);
            // console.log(result);
            if (!result) {
                throw createError(404, 'User does not exist.');
            }
            res.send(result);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }
};