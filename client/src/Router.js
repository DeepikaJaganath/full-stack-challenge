import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Signup from './containers/Signup/signup';
import Login from './containers/Login/login';

const Router = () => (
    <Switch>
        <Route exact path = '/' component = { Signup }/>
        <Route exact path = '/login' component = { Login }/>
    </Switch>
)

export default Router;