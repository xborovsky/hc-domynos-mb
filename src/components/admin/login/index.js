import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';

import { formConfig } from './form-config';
import { validateFormField } from '../../../util/form-validator';
import firebase from '../../../util/firebase';
import Alert from '../../common/alert';
import Btn from '../../common/button';
import { Input } from '../../common/forms';

import './Login.css';

export default class Login extends Component {

    state = {
        formConfig: formConfig,
        invalidMessage : null,
        showAlert : false
    }

    componentDidMount() {
        this.usernameRef.focus();
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

        firebase.auth().signInWithEmailAndPassword(username, password)
            .then(res => console.log('success', res) )
            .catch(err =>
                this.setState({
                    showAlert : true,
                    invalidMessage : err.message
                })
            );
    };

    handleAlertClose = () => {
        this.setState({
            invalidMessage : null,
            showAlert : false
        });
    }

    render() {
        const { formConfig, invalidMessage, showAlert } = this.state;

        return (
            <>
                { showAlert && <Alert type="error" message={invalidMessage} onClose={this.handleAlertClose} /> }
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