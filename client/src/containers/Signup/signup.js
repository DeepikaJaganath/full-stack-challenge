import React, { Component } from 'react';
import axios from 'axios';
import SignupForm from './components/SignupForm';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.registerUser = this._registerUser.bind(this);
    }

    _registerUser(values) {
        console.log('values in register', values);
        axios.post(`http://localhost:8081/register`, values)
        .then((result) => {
            console.log('result is', result);
        })
    }
    render() {
        return(
            <div className = "signupContainer">
                <SignupForm submitForm = {this.registerUser}/>
            </div>
        )
    }
}

export default Signup;
