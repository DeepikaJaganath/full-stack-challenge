'use strict';

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VerificationService = {

    setVerified: function setVerified(email) {
        console.log('email', email);
        return _user2.default.findOneAndUpdate({ email: email }, { isVerified: true }, { new: true }).lean().exec(function (err, result) {
            if (err) {
                throw { code: 500, message: 'Error updating user' };
            }
        });
    },

    isVerified: function isVerified(credentials) {
        console.log('credentials are', credentials);
        var email = credentials.email;
        return _user2.default.findOne({ email: email }, function (err, user) {
            if (err) {
                throw { code: 500, message: 'Error finding user' };
            } else {
                console.log('user is', user);
                if (user.isVerified === true) {
                    return user.isVerified;
                } else {
                    throw { code: 400, message: 'User is not authenticated' };
                }
            }
        });
    },

    authenticateUser: function authenticateUser(email) {

        try {
            VerificationService.setVerified(email);
        } catch (e) {
            console.error(e);
        }
    },

    checkAuthenticated: function checkAuthenticated(spec) {
        try {
            var isVerified = VerificationService.isVerified(spec);
            return isVerified;
        } catch (e) {
            console.error(e);
        }
    }

};

module.exports = VerificationService;