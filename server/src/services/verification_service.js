const User = require('../models/user');

let VerificationService = {

    /*
        Function to update the user account as verified
    */
    setVerified: (email) => {
        return new Promise((resolve, reject)=> {
            return User.findOneAndUpdate({email: email}, {isVerified: true}, {new: true})
            .lean().exec((err, result) => {
                if(err) {
                    reject({ code: 500, message: 'Error updating user' });
                } else {
                    resolve(result);
                }
            })
        })
    },

    /*
        Function to check if user is register
    */
    isRegistered: (credentials) => {
        return new Promise((resolve, reject) => {
            const email = credentials.email;
            return User.findOne({email: email}, (err, user) => {
                if(err) {
                    reject({'code':500,'message':'Error in finding user'});
                } else {
                    if(!user) {
                        reject({'code':400,'message':'User not found'});
                    } else {
                        resolve(user);
                    }
                }
            })
        })
    },

    isVerified: (user) => {
        if(user.isVerified === true) {
            return true;
        } else {
            return false;
        }
    },

    authorizeUser: (email) => {
        try{
            return VerificationService.setVerified(email);
        }
        catch(e) {
            throw(e);
        }
    },

    checkAuthenticated: async (spec) => {
        try {
            const registeredUser = await VerificationService.isRegistered(spec);
            const isVerified = await VerificationService.isVerified(registeredUser);
            return isVerified;
        }
        catch(err) {
            throw(err)
        }
    }

}

module.exports = VerificationService;