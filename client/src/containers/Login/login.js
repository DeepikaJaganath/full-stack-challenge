import React, { Component } from 'react';
import axios from 'axios';
import './login.css';
import LoginForm from './components/LoginForm';
import ConfirmModal from './components/ConfirmModal';
import { Card } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../api';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: false
        }
        this.loginForm = this._loginForm.bind(this);
    }

    _loginForm(values) {
        axios.post(`${api.url}/login`, values)
        .then((res) => {
            if(res.status === 200) {
                this.setState({isLogged: true})
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
                <Card title = {<span className = "titleStyle">Login</span> } className = "loginFormContainer">
                    <LoginForm submitForm = {this.loginForm}/>
                </Card>
                {this.state.isLogged === true ? <ConfirmModal showModal = {this.state.isLogged}/>: null }
            </div>
        )
    }
}

export default Login;