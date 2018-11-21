import validator from 'validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { tokenSecret } from '../config';

import User from '../models/user';
import validate from '../validation/validator';
import registerSchema from '../validation/schemas/registerSchema';
import EmailService from './email_service';

let UserService = {

    validateBody: (userDetails) => {
        console.log('user Detaild', userDetails);
        return validate.validateBody(userDetails, registerSchema)
        .then(() => {
            if(!validator.isEmail(userDetails.email)) {
                throw { code: 400, message: 'Not a valid email address'}
            }
        })
    },

    isEmailAddressAvailable: (email) => {
        return User.findOne({'email': email})
            .then((users) => {
                console.log('users are', users);
               if(!users) {
                   return false;
               } else {
                   throw { code: 400, message: 'Email already taken'}
               }
            })
    },

    saveUser: (userDetails) => {
        let newUser = new User();
        newUser.email = userDetails.email;
        newUser.password = userDetails.password;
        newUser.access_token = userDetails.token;
        return new Promise((resolve, reject) => {
            newUser.save((err, savedUser) => {
                console.log('saved user is', savedUser);
                if(err) {
                   reject(err);
                } else {
                    resolve(savedUser)
                }
            })
        })
    },

    generateToken: (user) => {
        const payload = {
            userEmail: user.email,
            iss: 'squashApps',
            iat: Date.now()
        }
        console.log('payload is', payload);

        user.token = jwt.sign(payload, tokenSecret);
        return user;
    },

    loginUser: (userDetails) => {
        let email = userDetails.email;
        let password = userDetails.password;
        return new Promise((resolve, reject) => {
            User.findOne({email: email}, (err, user) => {
                if(err) {
                    throw { code : 500, message : 'Error logging in user'}
                } else {
                    bcrypt.compare(password, user.password, (err, result) => {
                        if(result === true){
                            resolve(user)
                          }
                          else{
                            reject(err)
                          }
                    })
                }
            })
        })
        
    },

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
            console.log('error', err);
            return err;
        }
    },

    getUser: async (userDetails) => {
        try {
            await UserService.validateBody(userDetails);
            const user = UserService.loginUser(userDetails);
            return user;
        }
        catch(err) {
            return err;
        }
    }
    
}
module.exports = UserService;