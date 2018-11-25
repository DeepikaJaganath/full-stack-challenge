'use strict';

var User = require('../models/user');

var VerificationService = {

    /*
        Function to update the user account as verified
    */
    setVerified: function setVerified(email) {
        return new Promise(function (resolve, reject) {
            return User.findOneAndUpdate({ email: email }, { isVerified: true }, { new: true }).lean().exec(function (err, result) {
                if (err) {
                    reject({ code: 500, message: 'Error updating user' });
                } else {
                    resolve(result);
                }
            });
        });
    },

    /*
        Function to check if user is register
    */
    isRegistered: function isRegistered(credentials) {
        return new Promise(function (resolve, reject) {
            var email = credentials.email;
            return User.findOne({ email: email }, function (err, user) {
                if (err) {
                    reject({ 'code': 500, 'message': 'Error in finding user' });
                } else {
                    if (!user) {
                        reject({ 'code': 400, 'message': 'User not found' });
                    } else {
                        resolve(user);
                    }
                }
            });
        });
    },

    isVerified: function isVerified(user) {
        if (user.isVerified === true) {
            return true;
        } else {
            return false;
        }
    },

    authorizeUser: function authorizeUser(email) {
        try {
            return VerificationService.setVerified(email);
        } catch (e) {
            throw e;
        }
    },

    checkAuthenticated: async function checkAuthenticated(spec) {
        try {
            var registeredUser = await VerificationService.isRegistered(spec);
            var isVerified = await VerificationService.isVerified(registeredUser);
            return isVerified;
        } catch (err) {
            throw err;
        }
    }

};

module.exports = VerificationService;