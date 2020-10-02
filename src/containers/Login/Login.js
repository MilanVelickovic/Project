import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import * as actionTypes from '../../store/actions';

import classes from './Login.module.css';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

class Login extends Component {

    state = {
        formElements: {
            email: {
                type: 'text',
                placeholder: 'Email',
                value: ''
            },
            password: {
                type: 'password',
                placeholder: 'Password',
                value: ''
            }
        },
        errorMessage: null
    }

    inputChangeHandler = (event, element) => {
        let formElementsCopy = {...this.state.formElements};
        formElementsCopy[element].value = event.target.value;
        this.setState({
            formElements: formElementsCopy
        });
    }

    errorHandler = (statusCode) => {
        switch (statusCode) {
            case 401:
                this.setState({
                    errorMessage: <p className={classes.error}>Error: Incorrect password!</p>
                });
                break;
            case 422:
                this.setState({
                    errorMessage: <p className={classes.error}>Error: Email doesn't exist!</p>
                });
                break;
            default:
                this.setState({
                    errorMessage: <p className={classes.error}>Error: status code {statusCode}</p>
                })
                break;      
        }
    }

    login = (event) => {
        event.preventDefault();
        const form_data = {
            email: this.state.formElements.email.value,
            password: this.state.formElements.password.value
        }
        axios.post(`http://dev.api.kabox.io/api/auth/login/`, form_data)
            .then(response => {
                this.props.setAuthenticationHandler(true);
                localStorage.setItem('access_token', response.data.access_token);
                this.props.history.replace(`/home`);
            })
            .catch(error => this.errorHandler(error.response.status));

    }

    render () {
        let errorMessage = this.state.errorMessage;

        return (
            <div className={classes.Login}>
                <form onSubmit={this.login}>
                    <h1>Login</h1>
                    {Object.keys(this.state.formElements).map(formElement => {
                        return <Input 
                                    key={formElement}
                                    type={this.state.formElements[formElement].type} 
                                    placeholder={this.state.formElements[formElement].placeholder} 
                                    value={this.state.formElements[formElement].value}
                                    action={(event) => this.inputChangeHandler(event, formElement)}/>;
                    })}
                    {errorMessage}
                    <Button>Login</Button>
                </form>
            </div>
        );
    }
    
}

const dataFromStore = state => {
    return {
        authenticated: state.authenticated
    }
}

const dispatching = dispatch => {
    return {
        setAuthenticationHandler: (authentification) => dispatch({
            type: actionTypes.SET_AUTHENTICATION,
            authentification: authentification
        })
    }
}

export default connect(dataFromStore, dispatching)(Login);