import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

import { fetchAll } from '../../../dao/match-dao';
import { refTypes } from '../../../dao/ref-types';
import { deleteById } from '../../../dao/common-dao';
import MatchesTable from './MatchesTable';
import { withLoading } from '../../hoc/withLoading';
import Alert from '../../common/alert';
import ConfirmBox from '../../common/confirm-box';

const MatchesList = ({matches, onDelete, onEdit}) =>
    <MatchesTable matches={matches} onDelete={onDelete} onEdit={onEdit} />
;

const ManageMatchesWithLoading = withLoading(MatchesList);

export default class ManageMatches extends Component {

    state = {
        matches : [],
        showLoading : true,
        showError : false,
        errorMessage : null,
        actionConfirm : {
            show : false,
            message : null,
            matchId : null
        },
        teams : []
    };

    componentDidMount() {
        fetchAll()
            .then(matches => this.setState({ matches, showLoading : false }));
    }

    showDeleteMatchConfirm = match => {
        this.setState({
            actionConfirm : {
                show : true,
                message : `Do you really want to delete match ${match.home} - ${match.away} at ${match.place} (${match.datetime})?`,
                matchId : match.id
            }
        });
    };

    handleDeleteMatchConfirmed = () => {
        const { actionConfirm, matches } = this.state;

        deleteById(refTypes.match, actionConfirm.matchId)
            .then(() => {
                const newMatches = matches.filter(m => m.id !== actionConfirm.matchId);
                this.setState({ matches : newMatches });
            })
            .catch(err => this.setState({ showError : true, errorMessage : err.message }));
            this.handleDeleteMatchCanceled();
    };

    handleDeleteMatchCanceled = () => {
        this.setState({
            actionConfirm : {
                show : false,
                message : null,
                matchId : null
            }
        });
    };

    handleAlertClose = () => {
        this.setState({
            showError : false,
            errorMessage : null
        });
    };

    handleEditMatch = match => {
        console.log('TODO');
    };

    render() {
        const { matches, showError, errorMessage, actionConfirm, showLoading } = this.state;

        return (
            <>
                <h2>Manage matches</h2>
                { showError && <Alert type="error" message={errorMessage} onClose={this.handleAlertClose} /> }
                {
                    <ConfirmBox
                        display={actionConfirm.show}
                        message={actionConfirm.message}
                        handleConfirm={this.handleDeleteMatchConfirmed}
                        handleCancel={this.handleDeleteMatchCanceled} />
                }
                <Grid container>
                    <Grid item xs></Grid>
                    <Grid item xs={12} md={10} lg={8}>
                        <ManageMatchesWithLoading
                            showLoading={showLoading}
                            matches={matches}
                            onDelete={match => this.showDeleteMatchConfirm(match)}
                            onEdit={match => this.handleEditMatch(match)} />
                    </Grid>
                    <Grid item xs></Grid>
                </Grid>
            </>
        );
    }

}