import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

import { editFormConfig } from '../edit-form-config';
import { fetchMatchById } from '../../../../dao/match-dao';
import { fetchAll as fetchAllPlayers } from '../../../../dao/roster-dao';
import { fetchList as fetchAllTeams } from '../../../../dao/common-dao';
import Alert from '../../../common/alert';
import Btn from '../../../common/button';
import Loader from '../../../common/loader';
import EditMatchGeneral from './EditMatchGeneral';
import EditMatchScore from './EditMatchScore';
import EditMatchGoals from './EditMatchGoals';
import { refTypes } from '../../../../dao/ref-types';

class EditMatchForm extends Component {
    state = {
        formConfig : editFormConfig,
        errorMessage : null,
        match : null,
        teams : [],
        players : [],
        showLoading : true
    };

    componentDidMount() {
        const matchId = this.props.match.params.matchId;

        Promise.all([fetchMatchById(matchId), fetchAllPlayers(), fetchAllTeams(refTypes.team)])
            .then(resolvedValues => {
                // potrebuju to do options narvat se spravnym formatem value - text
                // TODO spis upravit dao?
                const players = resolvedValues[1];
                const teams = resolvedValues[2];
                console.log(teams);
                for(let i = 0; i < teams.length; i++){
                    teams[i].value = teams[i]['id'];
                    teams[i].text = teams[i]['name'];
                }
                for(let i = 0; i < players.length; i++){
                    players[i].value = players[i]['id'];
                    players[i].text = players[i]['name'];
                }
                teams.unshift({id : null, name : null});
                players.unshift({id : null, name : null});
                console.log(players);

                this.setState({
                    match : resolvedValues[0],
                    players : players,
                    teams : teams,
                    showLoading : false
                });
            })
            .catch(err => {
                console.error(err);
                this.setState({ errorMessage : err.message, showLoading : false })
            });
    }

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

    handleAlertClose = () => {
        this.setState({ errorMessage : null });
    };

    handleSubmit = () => {
        console.log('TODO handleSubmit');
    };

    createScoringTable = () => {
        const numGoals = this.state.formConfig.homeScore.htmlData.value;
        let fields = [];

        for (var i=0; i<numGoals; i++) {
            fields.push(
                <>

                </>
            );
        }


        return fields.join();
    }

    render() {
        const { formConfig, showLoading, errorMessage, players, teams } = this.state;

        return (
            showLoading ?
                <Loader /> :
                <Grid container>
                    <Grid item xs></Grid>
                    <Grid item xs={12} md={10} lg={8}>
                        <h2>Edit match</h2>
                        <Paper className="edit-form-wrapper">
                            {errorMessage && <Alert type="error" message={errorMessage} onClose={this.handleAlertClose} />}
                            <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>

                                <EditMatchGeneral formConfig={formConfig} handleChange={this.handleChange} allTeams={teams} />

                                <Divider variant="middle" />

                                <EditMatchScore formConfig={formConfig} handleChange={this.handleChange} />

                                <EditMatchGoals formConfig={formConfig} allPlayers={players} />

                                <Btn className="submit-btn" type="submit">Save</Btn>
                            </form>
                        </Paper>
                    </Grid>
                    <Grid item xs></Grid>
                </Grid>
        );
    }

}

export default EditMatchForm;