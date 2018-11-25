const jwt = require('jsonwebtoken');
const tokenSecret = require('../config').tokenSecret;
const REDIRECT_URL = require('../constant').REDIRECT_URL;
const VerificationService =  require('../services/verification_service');


const authorizeUser = (decoded, res) => {
    VerificationService.authorizeUser(decoded.userEmail)
        .then((user) => {
            res.redirect(`${REDIRECT_URL}`)
        })
        .catch((err) =>{
            res.status(err.code).send(err.message)
        })
}

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

const verifyUser = async (req, res) => {
    const token = req.params.token
    if(token) {
        jwt.verify(token, tokenSecret, (err, decoded) => {
            if(err) {
                return res.status(403).json({
                    message: 'Failed to authenticate token.'
                })
            } else {
                authorizeUser(decoded, res);
            }
        })
    } else {
        return res.status(403).json({
            message: 'No token provided.'
        })
    }
}


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

const isAuthenticated = (req, res, next) => {
    const spec = {
        email: req.body.email,
        password: req.body.password
    }
    VerificationService.checkAuthenticated(spec)
        .then((isVerified) => isVerified === true ? next(): res.status(401).send('User is unauthorized'))
        .catch((err) =>{
            res.status(err.code).send(err.message)
        });
}

module.exports = {
    verifyUser,
    isAuthenticated
}