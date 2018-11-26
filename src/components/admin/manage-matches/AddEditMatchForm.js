import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { formConfig } from './form-config';
import { fetchList } from '../../../dao/common-dao';
import { refTypes } from '../../../dao/ref-types';
import { Input, Select } from '../../common/forms';
import Alert from '../../common/alert';
import Btn from '../../common/button';
import { validateFormField } from '../../../util/form-validator';
import { addMatch } from '../../../dao/match-dao';
import Loader from '../../common/loader';

import './ManageMatches.css';

class AddEditMatch extends Component {

    state = {
        formConfig : formConfig,
        invalidMessage : null,
        showLoading : true
    };

    componentDidMount() {
        fetchList(refTypes.team)
            .then(teams => {
                // potrebuju to do options narvat se spravnym formatem value - text
                for(let i = 0; i < teams.length; i++){
                    teams[i].value = teams[i]['id'];
                    teams[i].text = teams[i]['name'];
                }

                this.setState({
                    formConfig : {
                        ...this.state.formConfig,
                        home : {
                            ...this.state.formConfig.home,
                            options : teams
                        },
                        away : {
                            ...this.state.formConfig.away,
                            options : teams
                        }
                    },
                    showLoading : false
                })
            })
            .catch(err => this.setState({ invalidMessage : err.message }));
    }

    handleAlertClose = () => {
        this.setState({ invalidMessage : null });
    };

    handleChange = event => {
        const name = event.target.name,
            value = event.target.value,
            type = event.target.type,
            { formConfig } = this.state;

        if (type === 'checkbox') {
            const checked = event.target.checked;
            this.setState({
                formConfig: {
                    ...formConfig,
                    [name]: {
                        ...formConfig[name],
                        htmlData: {
                            ...formConfig[name].htmlData,
                            checked
                        }
                    }
                }
            });
        } else {
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
    }

    handleSubmit = event => {
        event.preventDefault();

        this.setState({ invalidMessage: null });

        const { formConfig } = this.state;

        const [home, away, homeScore, awayScore, isSo, place, datetime] = [
            formConfig.home.htmlData.value,
            formConfig.away.htmlData.value,
            formConfig.homeScore.htmlData.value,
            formConfig.awayScore.htmlData.value,
            formConfig.so.htmlData.checked,
            formConfig.place.htmlData.value,
            formConfig.datetime.htmlData.value
        ];

        for (const field in formConfig) {
            const validationResult = validateFormField(formConfig[field]);
            if (validationResult.length) {
                this.setState({ invalidMessage: validationResult[0] });
                return false;
            }
        }

        addMatch(home, away, homeScore, awayScore, isSo, place, datetime)
            .then(res => this.props.history.push({
                pathname : '/admin/manage-matches',
                state : {
                    successMsg : 'Match successfully created.'
                }
            }))
            .catch(err => this.setState({ invalidMessage: err.message }));
    };

    render() {
        const { formConfig, invalidMessage, showLoading } = this.state;

        return (
            showLoading ?
                <Loader /> :
                <Grid container>
                    <Grid item xs></Grid>
                    <Grid item xs={12} md={10} lg={8}>
                        <h2>Add match</h2>
                        <Paper className="edit-form-wrapper">
                            {invalidMessage && <Alert type="error" message={invalidMessage} onClose={this.handleAlertClose} />}
                            <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>

                                <Select onChange={(evt) => this.handleChange(evt)}
                                    {...formConfig.home.htmlData}
                                    required={formConfig.home.validations.required}
                                    error={formConfig.home.validations.errors && formConfig.home.validations.errors.length}
                                    fullWidth
                                    options={formConfig.home.options}
                                    InputLabelProps={{ shrink: true }} />

                                <Select onChange={(evt) => this.handleChange(evt)}
                                    {...formConfig.away.htmlData}
                                    required={formConfig.away.validations.required}
                                    error={formConfig.away.validations.errors && formConfig.away.validations.errors.length}
                                    fullWidth
                                    options={formConfig.away.options}
                                    InputLabelProps={{ shrink: true }} />

                                <Input onChange={(evt) => this.handleChange(evt)}
                                    {...formConfig.place.htmlData}
                                    required={formConfig.place.validations.required}
                                    error={formConfig.place.validations.errors && formConfig.place.validations.errors.length}
                                    fullWidth />

                                <Input onChange={(evt) => this.handleChange(evt)}
                                    {...formConfig.datetime.htmlData}
                                    required={formConfig.datetime.validations.required}
                                    error={formConfig.datetime.validations.errors && formConfig.datetime.validations.errors.length}
                                    fullWidth
                                    InputLabelProps={{ shrink: true }} />

                                <Input onChange={(evt) => this.handleChange(evt)}
                                    {...formConfig.homeScore.htmlData}
                                    required={formConfig.homeScore.validations.required}
                                    error={formConfig.homeScore.validations.errors && formConfig.homeScore.validations.errors.length}
                                    InputLabelProps={{ shrink: true }}
                                    className='score' />

                                <Input onChange={(evt) => this.handleChange(evt)}
                                    {...formConfig.awayScore.htmlData}
                                    required={formConfig.awayScore.validations.required}
                                    error={formConfig.awayScore.validations.errors && formConfig.awayScore.validations.errors.length}
                                    InputLabelProps={{ shrink: true }}
                                    className='score' />

                                    <FormControlLabel
                                    control={
                                        <Checkbox
                                            onChange={e => this.handleChange(e)}
                                            {...formConfig.so.htmlData}
                                            color="primary"
                                            value="so" />
                                    }
                                    label={formConfig.so.htmlData.label}
                                    />

                                <Btn className="submit-btn" type="submit">Save</Btn>
                            </form>
                        </Paper>
                    </Grid>
                    <Grid item xs></Grid>
                </Grid>
        );
    }

}

export default withRouter(AddEditMatch);