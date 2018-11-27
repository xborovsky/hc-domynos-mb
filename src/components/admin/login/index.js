import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string'

import { formConfig } from './form-config';
import { validateFormField } from '../../../util/form-validator';
import Alert from '../../common/alert';
import Btn from '../../common/button';
import { Input } from '../../common/forms';

import './Login.css';
import { logInUser } from './redux/thunk';

class Login extends Component {

    state = {
        formConfig: formConfig,
        invalidMessage : null,
        showAlert : false,
        showSuccess : false,
        successMessage : null
    }

    componentDidMount() {
        this.usernameRef.focus();

        const queryParams = queryString.parse(this.props.location.search);
        if (queryParams.logoutSuccess) {
            this.setState({ showSuccess : true, successMessage : 'Logout successful.' });
            setTimeout(() => { this.handleAlertClose() }, 2000)
        }
    }

    handleChange = (event) => {
        const name = event.target.name,
            value = event.target.value,
            { formConfig } = this.state;

        this.setState({
            formConfig :  {...formConfig,
                [name] : {...formConfig[name],
                    htmlData : {...formConfig[name].htmlData,
                        value
                    }
                }
            }
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({
            invalidMessage : null,
            showAlert : false
        });

        const { formConfig } = this.state;

        const [username, password] = [
            formConfig.username.htmlData.value,
            formConfig.password.htmlData.value
        ];

        for (const field in formConfig) {
            const validationResult = validateFormField(formConfig[field]);
            if (validationResult.length) {
                this.setState({
                    invalidMessage : validationResult[0],
                    showAlert : true
                });
                return false;
            }
        }

        this.props.logIn(username, password);
    };

    handleAlertClose = () => {
        this.setState({
            invalidMessage : null,
            showAlert : false,
            successMessage : null,
            showSuccess : false
        });
    }

    render() {
        const { formConfig, invalidMessage, showAlert, showSuccess, successMessage } = this.state;
        const { loggedIn, logInError } = this.props;

        return (
            loggedIn ? <Redirect to='/admin' /> :
            <>
                { showAlert && <Alert type="error" message={invalidMessage} onClose={this.handleAlertClose} /> }
                { logInError && <Alert type="error" message={logInError} /> }
                { showSuccess && <Alert type="success" message={successMessage} onClose={this.handleAlertClose} /> }
                <div className="login-page">
                    <Paper className="form">
                        <form className="login-form" noValidate autoComplete="off" onSubmit={event => this.handleSubmit(event)}>

                            <Input onChange={(evt) => this.handleChange(evt)}
                                {...formConfig.username.htmlData}
                                required={formConfig.username.validations.required}
                                error={formConfig.username.validations.errors && formConfig.username.validations.errors.length}
                                fullWidth
                                inputRef={input => this.usernameRef = input } />

                            <Input type="password"
                                onChange={(evt) => this.handleChange(evt)}
                                {...formConfig.password.htmlData}
                                required={formConfig.password.validations.required}
                                error={formConfig.password.validations.errors && formConfig.password.validations.errors.length}
                                fullWidth />

                            <Btn type="submit" className="submit-btn">Login</Btn>
                        </form>
                    </Paper>
                </div>
            </>
        );
    }

}

const mapStateToProps = state => ({
    loggedIn : state.authReducer.loggedIn,
    logInError : state.authReducer.error
});

const mapDispatchToProps = dispatch => ({
    logIn : (username, password) => dispatch(logInUser(username, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);