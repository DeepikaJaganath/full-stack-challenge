import jwt from 'jsonwebtoken';
import { tokenSecret } from '../config';
import constants from '../constant';
import VerificationService from '../services/verification_service';

const verifyUser = async (req, res) => {
    const token = req.params.token
    if(token) {
        jwt.verify(token, tokenSecret, async (err, decoded) => {
            if(err) {
                return res.status(403).json({
                    message: 'Failed to authenticate token.'
                })
            } else {
                console.log('decoded email',decoded)
                await VerificationService.authenticateUser(decoded.userEmail);
                console.log('THIS should print after authentication ****************', constants.REDIRECT_URL);
                res.redirect(`${constants.REDIRECT_URL}`)
                
            }
        })
    } else {
        return res.status(403).json({
            message: 'No token provided.'
        })
    }
}

const isAuthenticated = (req, res, next) => {
    const spec = {
        email: req.body.email,
        password: req.body.password
    }
    console.log('spec is', spec);
    VerificationService.checkAuthenticated(spec)
        .then((isVerified) => next())
}

module.exports = {
    verifyUser,
    isAuthenticated
}