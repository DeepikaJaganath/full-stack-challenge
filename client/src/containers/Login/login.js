import React, { Component } from 'react';
import axios from 'axios';
import LoginForm from './components/LoginForm';

class Login extends Component {
    constructor(props) {
        super(props);
        this.loginForm = this._loginForm.bind(this);
    }

    _loginForm(values) {
        console.log('values in login form', values);
        axios.post(`http://localhost:8081/login`, values)
        .then((result) => {
            console.log('result is', result);
        })
    }
    render() {
        return(
            <div className = "loginFormContainer">
                <LoginForm submitForm = {this.loginForm}/>
            </div>
        )
    }
}

export default Login;