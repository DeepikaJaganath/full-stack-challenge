'use strict';

var validator = require('validator');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var tokenSecret = require('../config').tokenSecret;
var payloadSecret = require('../config').payloadSecret;
var expirationTime = require('../config').expirationTime;

var User = require('../models/user');
var validate = require('../validation/validator');
var registerSchema = require('../validation/schemas/registerSchema');
var EmailService = require('./email_service');

var UserService = {

    /*
        Function to validate the body provided by the user
    */
    validateBody: function validateBody(userDetails) {
        return validate.validateBody(userDetails, registerSchema).then(function () {
            if (!validator.isEmail(userDetails.email)) {
                throw { code: 400, message: 'Not a valid email address' };
            }
        });
    },

    /*
        Checks if the provided email address is already available
    */
    isEmailAddressAvailable: function isEmailAddressAvailable(email) {
        return User.findOne({ 'email': email }).then(function (users) {
            if (!users) {
                return false;
            } else {
                throw { code: 400, message: 'Email already taken' };
            }
        });
    },

    /*
        Function to save user in the database
    */
    saveUser: function saveUser(userDetails) {
        var newUser = new User();
        newUser.email = userDetails.email;
        newUser.password = userDetails.password;
        newUser.access_token = userDetails.token;
        return new Promise(function (resolve, reject) {
            newUser.save(function (err, savedUser) {
                if (err) {
                    reject(err);
                } else {
                    resolve(savedUser);
                }
            });
        });
    },

    /*
        Function to generate json web token
    */
    generateToken: function generateToken(user) {
        var payload = {
            userEmail: user.email,
            iss: payloadSecret,
            iat: Date.now(),
            expiresIn: expirationTime
        };
        user.token = jwt.sign(payload, tokenSecret);
        return user;
    },

    /*
        Function to login user
    */
    loginUser: function loginUser(userDetails) {
        var email = userDetails.email;
        var password = userDetails.password;
        return new Promise(function (resolve, reject) {
            User.findOne({ email: email }, function (err, user) {
                if (err) {
                    throw { code: 500, message: 'Error logging in user' };
                } else {
                    bcrypt.compare(password, user.password, function (err, result) {
                        if (result === true) {
                            resolve(user);
                        } else {
                            reject({ 'code': 401, 'message': 'Password incorrect' });
                        }
                    });
                }
            });
        });
    },

    /*
        Async function for creating user
    */
    createUser: async function createUser(userDetails) {
        try {
            await UserService.validateBody(userDetails);
            await UserService.isEmailAddressAvailable(userDetails.email);
            var registeredUser = await UserService.generateToken(userDetails);
            var savedUser = await UserService.saveUser(registeredUser);
            var verifyAccount = await EmailService.verifyAccount(savedUser);
            return savedUser;
        } catch (err) {
            throw err;
        }
    },

    /*
        Async function for logging the user in
    */
    getUser: async function getUser(userDetails) {
        try {
            await UserService.validateBody(userDetails);
            var user = UserService.loginUser(userDetails);
            return user;
        } catch (err) {
            throw err;
        }
    }

};
module.exports = UserService;