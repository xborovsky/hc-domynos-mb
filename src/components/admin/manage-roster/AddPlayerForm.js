import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';

import { formConfig } from './form-config';
import { validateFormField } from '../../../util/form-validator';
import Btn from '../../common/button';
import Alert from '../../common/alert';
import { addPlayer } from '../../../dao/roster-dao';
import { Input, Select } from '../../common/forms';
import PhotoUploader from '../../common/file-uploader/PhotoUploader';

class AddPlayerForm extends Component {

    state = {
        formConfig: formConfig,
        invalidMessage: null,
        submitable: true
    }

    componentDidMount() {
        this.nameRef.focus();
        /*if (this.props.editMode) {
            const player = null; // TODO load player!
            this.setState({
                playerId : 'TODO',
                formConfig : {
                    ...this.state.formConfig,
                    name : {
                        ...this.state.formConfig.name,
                        htmlData : {
                            ...this.state.formConfig.name.htmlData,
                            value : player.name
                        }
                    }
                }
            });
        }*/
    }

    handleChange = (event) => {
        const name = event.target.name,
            value = event.target.value,
            { formConfig } = this.state;

        this.setState({
            formConfig: {
                ...formConfig,
                [name]: {
                    ...formConfig[name],
                    htmlData: {
                        ...formConfig[name].htmlData,
                        value
                    }
                }
            }
        });
    }

    handleSubmit = event => {
        event.preventDefault();

        this.setState({ invalidMessage: null });

        const { formConfig, imageUrl } = this.state;

        const [name, number, position] = [
            formConfig.name.htmlData.value,
            formConfig.number.htmlData.value,
            formConfig.position.htmlData.value
        ];

        for (const field in formConfig) {
            const validationResult = validateFormField(formConfig[field]);
            if (validationResult.length) {
                this.setState({ invalidMessage: validationResult[0] });
                return false;
            }
        }

        addPlayer(name, number, position, imageUrl)
            .then(res => this.props.history.push({
                pathname : '/admin/manage-roster',
                state : {
                    successMsg : 'Player successfully created.'
                }
            }))
            .catch(err => this.setState({ invalidMessage: err.message }));
    };

    handleAlertClose() {
        this.setState({ invalidMessage: null });
    }

    handleUploadStart = () => {
        this.setState({ submitable: false });
    }

    handleUploadFinish = imageUrl => {
        this.setState({ submitable: true, imageUrl });
    }

    render() {
        const { formConfig, invalidMessage, submitable } = this.state;

        return (
            <Grid container>
                <Grid item xs></Grid>
                <Grid item xs={12} md={10} lg={8}>
                    <h2>Add player to roster</h2>
                    <Paper className="edit-form-wrapper">
                        {invalidMessage && <Alert type="error" message={invalidMessage} onClose={this.handleAlertClose} />}
                        <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>

                            <Input onChange={(evt) => this.handleChange(evt)}
                                {...formConfig.name.htmlData}
                                required={formConfig.name.validations.required}
                                error={formConfig.name.validations.errors && formConfig.name.validations.errors.length}
                                fullWidth
                                inputRef={input => this.nameRef = input } />

                            <Input onChange={(evt) => this.handleChange(evt)}
                                {...formConfig.number.htmlData}
                                required={formConfig.number.validations.required}
                                error={formConfig.number.validations.errors && formConfig.number.validations.errors.length}
                                fullWidth />

                            <Select onChange={(evt) => this.handleChange(evt)}
                                {...formConfig.position.htmlData}
                                required={formConfig.position.validations.required}
                                error={formConfig.position.validations.errors && formConfig.position.validations.errors.length}
                                fullWidth
                                options={formConfig.position.options}
                                InputLabelProps={{ shrink: true }} />

                            <PhotoUploader onUploadStart={this.handleUploadStart} onUploadFinish={this.handleUploadFinish} />

                            <Btn className="submit-btn" type="submit" disabled={!submitable}>Save</Btn>
                        </form>
                    </Paper>
                </Grid>
                <Grid item xs></Grid>
            </Grid>
        );
    }

}

AddPlayerForm.propTypes = {
    editMode: PropTypes.bool
};

export default withRouter(AddPlayerForm);