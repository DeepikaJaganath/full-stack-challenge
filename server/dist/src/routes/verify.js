'use strict';

var jwt = require('jsonwebtoken');
var tokenSecret = require('../config').tokenSecret;
var REDIRECT_URL = require('../constant').REDIRECT_URL;
var VerificationService = require('../services/verification_service');

var authorizeUser = function authorizeUser(decoded, res) {
    VerificationService.authorizeUser(decoded.userEmail).then(function (user) {
        res.redirect('' + REDIRECT_URL);
    }).catch(function (err) {
        res.status(err.code).send(err.message);
    });
};

/**
 * @api {GET} Verify if user is authenticated and provide Authorization
 * @apiName Authorize User
 * @apiGroup Authorization
 * 
 * @apiParam {String} token, Users access token 
 * 
 * @apiSuccess
 * Sends Email to the user
 * 
 * @apiFailure
 * HTTP 403, Failed to authenticate token
 */

var verifyUser = async function verifyUser(req, res) {
    var token = req.params.token;
    console.log('token is', token);
    if (token) {
        jwt.verify(token, tokenSecret, function (err, decoded) {
            if (err) {
                return res.status(403).json({
                    message: 'Failed to authenticate token.'
                });
            } else {
                authorizeUser(decoded, res);
            }
        });
    } else {
        return res.status(403).json({
            message: 'No token provided.'
        });
    }
};

/**
 * @api {POST} Checks if user is Authenticated before logging in.
 * @apiName Check Authentication
 * 
 * @apiParam {JSON} 
 * {
 *  "email": "dummyemail@examp.com",
 *  "password" : "abcD1234@"
 * } 
 * 
 * @apiSuccess
 * Moves to Login API
 * 
 * @apiFailure
 * User is unAuthorized
 */

var isAuthenticated = function isAuthenticated(req, res, next) {
    var spec = {
        email: req.body.email,
        password: req.body.password
    };
    VerificationService.checkAuthenticated(spec).then(function (isVerified) {
        return isVerified === true ? next() : res.status(401).send('User is unauthorized');
    }).catch(function (err) {
        res.status(err.code).send(err.message);
    });
};

module.exports = {
    verifyUser: verifyUser,
    isAuthenticated: isAuthenticated
};