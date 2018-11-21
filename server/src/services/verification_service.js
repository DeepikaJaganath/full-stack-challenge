import User from '../models/user';

let VerificationService = {

    setVerified: (email) => {
        console.log('email',email)
        return User.findOneAndUpdate({email: email}, {isVerified: true}, {new: true})
        .lean().exec((err, result) => {
            if(err) {
                throw { code: 500, message: 'Error updating user' }
            }
        })
    },

    isVerified: (credentials) => {
        console.log('credentials are', credentials);
        let email = credentials.email;
        return User.findOne({email: email}, (err, user) => {
            if(err) {
                throw { code : 500, message: 'Error finding user'}
            } else {
                console.log('user is', user);
                if(user.isVerified === true) {
                    return user.isVerified
                } else {
                    throw { code: 400, message: 'User is not authenticated'}
                }
            }
        })
    },

    authenticateUser: (email) => {
        
        try{
            VerificationService.setVerified(email);
        }
        catch(e) {
            console.error(e);
        }
    },

    checkAuthenticated: (spec) => {
        try {
            const isVerified = VerificationService.isVerified(spec);
            return isVerified;
        }
        catch(e) {
            console.error(e);
        }
    }

}

module.exports = VerificationService;