import _ from 'lodash';

import UserService from '../services/user_service';

export const registerUser = (req, res) => {
    console.log('req is', req.body);
    let userDetails = _.pick(req.body, ['email', 'password']);
    UserService.createUser(userDetails).then((user) => {
        res.status(200).send(user);
    })
    .catch((err) => {
        res.status(500).send(err);
    });
};

export const login = (req, res) => {
    let userDetails = _.pick(req.body, ['email', 'password'])
    UserService.getUser(userDetails).then((user) => {
        res.status(200).send(user);
    })
    .catch((err) => {
        res.status(500).send(err);
    })

}