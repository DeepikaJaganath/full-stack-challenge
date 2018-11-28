import React, { Component } from 'react';
import axios from 'axios';
import SignupForm from './components/SignupForm';
import VerifyEmail from './components/VerifyEmail';
import { Card } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../api';

//style
import './signup.css';

class Signup extends Component {
        state = {
            showModal: false
        }

    registerUser = (values) => {
        axios.post(`${api.url}/register`, values)
        .then((res) => {
            if(res.status === 200) {
                this.setState({showModal: true})
            }
        })
        .catch(({response}) => {
            toast.error(response.data);
        })
    }
    render() {
        return(
            <div>
                <ToastContainer/>
                <Card title = {<span className = "titleStyle">Register</span> } bordered = {false} className = "signupContainer">
                    <SignupForm submitForm = {this.registerUser}/>
                </Card>
                {this.state.showModal=== true ? <VerifyEmail showModal = {this.state.showModal}/>: null }
            </div>
        )
    }
}

export default Signup;
