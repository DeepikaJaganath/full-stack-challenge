'use strict';

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _config = require('../config');

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _validator3 = require('../validation/validator');

var _validator4 = _interopRequireDefault(_validator3);

var _registerSchema = require('../validation/schemas/registerSchema');

var _registerSchema2 = _interopRequireDefault(_registerSchema);

var _email_service = require('./email_service');

var _email_service2 = _interopRequireDefault(_email_service);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserService = {

    validateBody: function validateBody(userDetails) {
        console.log('user Detaild', userDetails);
        return _validator4.default.validateBody(userDetails, _registerSchema2.default).then(function () {
            if (!_validator2.default.isEmail(userDetails.email)) {
                throw { code: 400, message: 'Not a valid email address' };
            }
        });
    },

    isEmailAddressAvailable: function isEmailAddressAvailable(email) {
        return _user2.default.findOne({ 'email': email }).then(function (users) {
            console.log('users are', users);
            if (!users) {
                return false;
            } else {
                throw { code: 400, message: 'Email already taken' };
            }
        });
    },

    saveUser: function saveUser(userDetails) {
        var newUser = new _user2.default();
        newUser.email = userDetails.email;
        newUser.password = userDetails.password;
        newUser.access_token = userDetails.token;
        return new Promise(function (resolve, reject) {
            newUser.save(function (err, savedUser) {
                console.log('saved user is', savedUser);
                if (err) {
                    reject(err);
                } else {
                    resolve(savedUser);
                }
            });
        });
    },

    generateToken: function generateToken(user) {
        var payload = {
            userEmail: user.email,
            iss: 'squashApps',
            iat: Date.now()
        };
        console.log('payload is', payload);

        user.token = _jsonwebtoken2.default.sign(payload, _config.tokenSecret);
        return user;
    },

    loginUser: function loginUser(userDetails) {
        var email = userDetails.email;
        var password = userDetails.password;
        return new Promise(function (resolve, reject) {
            _user2.default.findOne({ email: email }, function (err, user) {
                if (err) {
                    throw { code: 500, message: 'Error logging in user' };
                } else {
                    _bcrypt2.default.compare(password, user.password, function (err, result) {
                        if (result === true) {
                            resolve(user);
                        } else {
                            reject(err);
                        }
                    });
                }
            });
        });
    },

    createUser: async function createUser(userDetails) {
        try {
            await UserService.validateBody(userDetails);
            await UserService.isEmailAddressAvailable(userDetails.email);
            var registeredUser = await UserService.generateToken(userDetails);
            var savedUser = await UserService.saveUser(registeredUser);
            var verifyAccount = await _email_service2.default.verifyAccount(savedUser);
            return savedUser;
        } catch (err) {
            console.log('error', err);
            return err;
        }
    },

    getUser: async function getUser(userDetails) {
        try {
            await UserService.validateBody(userDetails);
            var user = UserService.loginUser(userDetails);
            return user;
        } catch (err) {
            return err;
        }
    }

};
module.exports = UserService;