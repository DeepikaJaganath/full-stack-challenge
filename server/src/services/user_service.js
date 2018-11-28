const validator = require('validator');
const jwt = require ('jsonwebtoken');
const bcrypt = require ('bcrypt');
const tokenSecret = require ('../config').tokenSecret;
const payloadSecret = require('../config').payloadSecret;
const expirationTime = require('../config').expirationTime;

const User = require ('../models/user');
const validate = require ('../validation/validator');
const registerSchema = require('../validation/schemas/registerSchema');
const EmailService = require('./email_service');
const CryptoService = require('./crypto_service');

let UserService = {

    /*
        Function to validate the body provided by the user
    */
    validateBody: (userDetails) => {
        return validate.validateBody(userDetails, registerSchema)
        .then(() => {
            if(!validator.isEmail(userDetails.email)) {
                throw { code: 400, message: 'Not a valid email address'};
            }
        })
    },

    /*
        Checks if the provided email address is already available
    */
    isEmailAddressAvailable: (email) => {
        return User.findOne({'email': email})
            .then((users) => {
               if(!users) {
                   return false;
               } else {
                   throw { code: 400, message: 'Email already taken'}
               }
            })
    },

    /*
        Function to save user in the database
    */
    saveUser: (userDetails) => {
        let newUser = new User(userDetails);
        return new Promise((resolve, reject) => {
            newUser.save((err, savedUser) => {
                if(err) {
                   reject(err);
                } else {
                    resolve(savedUser)
                }
            })
        })
    },

    /*
        Function to generate json web token
    */
    generateToken: (user) => {
        const payload = {
            userEmail: user.email,
            iss: payloadSecret,
            iat: Date.now(),
            expiresIn: expirationTime
        }
        user.token = jwt.sign(payload, tokenSecret);
        return user;
    },

    /*
        Function to login user
    */
    loginUser: (userDetails) => {
        let email = userDetails.email;
        let password = userDetails.password;
        return new Promise((resolve, reject) => {
            User.findOne({email: email}, async (err, user) => {
                if(err) {
                    throw { code : 500, message : 'Error logging in user'}
                } else {
                    let hashedPassword = await CryptoService.saltHashExistingPassword(password, user.salt);
                    if(hashedPassword.passwordHash === user.password) {
                        resolve(user);
                    } else {
                        reject({'code':401,'message':'Password incorrect'});
                    }
                }
            })
        })   
    },

    /*
        Async function for creating user
    */
    createUser: async (userDetails) => {
        try{ 
                await UserService.validateBody(userDetails);
                await UserService.isEmailAddressAvailable(userDetails.email);
                const registeredUser = await UserService.generateToken(userDetails);
                const savedUser = await UserService.saveUser(registeredUser);
                const verifyAccount = await EmailService.verifyAccount(savedUser);
                return savedUser;
        } 
        catch(err) {
            throw(err);
        }
    },

    /*
        Async function for logging the user in
    */
    getUser: async (userDetails) => {
        try {
            await UserService.validateBody(userDetails);
            const user = UserService.loginUser(userDetails);
            return user;
        }
        catch(err) {
            throw(err);
        }
    }
    
}
module.exports = UserService;