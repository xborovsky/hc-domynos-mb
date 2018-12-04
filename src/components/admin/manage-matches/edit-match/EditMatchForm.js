import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

import { editFormConfig } from '../edit-form-config';
import { fetchMatchById, updateMatch } from '../../../../dao/match-dao';
import { fetchPlayersForSelect } from '../../../../dao/roster-dao';
import { fetchAll as fetchAllTeams } from '../../../../dao/team-dao';
import Alert from '../../../common/alert';
import Btn from '../../../common/button';
import Loader from '../../../common/loader';
import EditMatchGeneral from './EditMatchGeneral';
import EditMatchScore from './EditMatchScore';
import EditMatchGoals from './EditMatchGoals';
import ConfirmBox from '../../../common/confirm-box';
import ConfirmMessage from '../ConfirmMessage';
import { validateFormField } from '../../../../util/form-validator';
import { domynos_id } from '../../../../util/domynos';

class EditMatchForm extends Component {
    state = {
        formConfig : editFormConfig,
        errorMessage : null,
        match : null,
        teams : [],
        players : [],
        showLoading : true,
        actionConfirm : {
            show : false,
            message : null
        }
    };

    componentDidMount() {
        const matchId = this.props.match.params.matchId;

        Promise.all([fetchMatchById(matchId), fetchPlayersForSelect(), fetchAllTeams()])
            .then(resolvedValues => {
                const match = resolvedValues[0],
                    teams = resolvedValues[2],
                    { formConfig } = this.state;

                this.mapToFormConfig(teams, match, formConfig);

                this.setState({
                    match, formConfig,
                    players : resolvedValues[1],
                    teams,
                    showLoading : false,
                    trackedField : match.home === domynos_id ?
                        'homeScore' : match.away === domynos_id ?
                            'awayScore' : null
                });
            })
            .catch(err => {
                console.error(err);
                this.setState({ errorMessage : err.message, showLoading : false })
            });
    }

    mapToFormConfig = (allTeams, matchData, formConfig) => {
        formConfig.home.htmlData.value = allTeams.find(team => team.id === matchData.home).name;
        formConfig.away.htmlData.value = allTeams.find(team => team.id === matchData.away).name;
        formConfig.place.htmlData.value = matchData.place;
        formConfig.datetime.htmlData.value = matchData.datetime;
        formConfig.homeScore.htmlData.value = matchData.homeScore;
        formConfig.awayScore.htmlData.value = matchData.awayScore;
        formConfig.goals = matchData.goals;
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
            }, () => {
                this.updateGoalsInForm(this.state.formConfig[this.state.trackedField].htmlData.value);
            });
        }
    }

    updateGoalsInForm = num => {
        const goalsCpy = this.state.formConfig.goals;

        if (num > goalsCpy.length) {
            for (let i=0; i<num - goalsCpy.length; i++) {
                goalsCpy.push({ g : null, a1 : null, a2 : null });
            }
        } else if (num < goalsCpy.length) {
            for (let i=0; i<goalsCpy.length - num; i++) {
                goalsCpy.pop();
            }
        }

        this.setState({
            formConfig : {
                ...this.state.formConfig,
                goals : goalsCpy
            }
        });
    };

    handleScoreChange = (type, cnt, event) => {
        const goalsCpy = this.state.formConfig.goals;
        goalsCpy[cnt][type] = event.target.value;

        this.setState({
            formConfig : {
                ...this.state.formConfig,
                goals : goalsCpy
            }
        });
    };

    handleAlertClose = () => {
        this.setState({ errorMessage : null });
    };

    handleSubmit = event => {
        event.preventDefault();

        this.setState({ invalidMessage: null });

        const { formConfig } = this.state;

        for (const field in formConfig) {
            const validationResult = validateFormField(formConfig[field]);
            if (validationResult.length) {
                this.setState({ invalidMessage: validationResult[0] });
                return false;
            }
        }

        // todo validate goals/assists

        this.showConfirm();
    };

    showConfirm = () => {
        const { formConfig } = this.state;
        const message = <ConfirmMessage
            homeTeamName={formConfig.home.htmlData.value}
            awayTeamName={formConfig.away.htmlData.value}
            place={formConfig.place.htmlData.value}
            datetime={formConfig.datetime.htmlData.value}
        />;

        this.setState({
            actionConfirm : {
                show : true,
                message
            }
        });
    };

    handleConfirmed = () => {
        const { match, formConfig } = this.state;
        updateMatch(
            match,
            formConfig.place.htmlData.value,
            formConfig.datetime.htmlData.value,
            parseInt(formConfig.homeScore.htmlData.value),
            parseInt(formConfig.awayScore.htmlData.value),
            formConfig.so.htmlData.checked,
            formConfig.goals
        ).then(res => this.props.history.push({
            pathname : '/admin/manage-matches',
            state : {
                successMsg : 'Match successfully updated.'
            }
        }))
        .catch(err => this.setState({ invalidMessage: err.message }));
    };

    handleCancel = () => {
        this.setState({
            actionConfirm : {
                show : false,
                message : null
            }
        });
    };

    render() {
        const { formConfig, showLoading, errorMessage,
            players, teams, match, actionConfirm } = this.state;

        return (
            showLoading ?
                <Loader /> :
                <>
                    <ConfirmBox
                        display={actionConfirm.show}
                        message={actionConfirm.message}
                        handleConfirm={this.handleConfirmed}
                        handleCancel={this.handleCancel} />
                    <Grid container>
                        <Grid item xs></Grid>
                        <Grid item xs={12} md={10} lg={8}>
                            <h2>Edit match</h2>
                            <Paper className="edit-form-wrapper">
                                {errorMessage && <Alert type="error" message={errorMessage} onClose={this.handleAlertClose} />}
                                <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>

                                    <EditMatchGeneral
                                        formConfig={formConfig}
                                        handleChange={this.handleChange}
                                        allTeams={teams} />

                                    <Divider variant="middle" />

                                    <EditMatchScore
                                        formConfig={formConfig}
                                        handleChange={this.handleChange}
                                        currentData={match} />

                                    <EditMatchGoals
                                        goalsFormConfig={formConfig.goals}
                                        allPlayers={players}
                                        handleChange={this.handleScoreChange} />

                                    <Btn className="submit-btn" type="submit">Save</Btn>
                                </form>
                            </Paper>
                        </Grid>
                        <Grid item xs></Grid>
                    </Grid>
                </>
        );
    }

}

export default EditMatchForm;