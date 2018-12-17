import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';

import { fetchAll as fetchAllRoster } from '../../../dao/roster-dao';
import { deleteById } from '../../../dao/common-dao';
import { refTypes } from '../../../dao/ref-types';
import RosterTable from './RosterTable';
import { withLoading } from '../../hoc/withLoading';
import Alert from '../../common/alert';
import ConfirmBox from '../../common/confirm-box';
import firebase from '../../../util/firebase';

import './ManageRoster.css';

const RosterList = ({roster, onDelete, onEdit}) =>
    <RosterTable roster={roster} onDelete={onDelete} onEdit={onEdit} />
;

const ManageRosterWithLoading = withLoading(RosterList);

class ManageRoster extends Component {

    state = {
        roster : [],
        showLoading : true,
        errorMessage : null,
        actionConfirm : {
            show : false,
            message : null,
            playerId : null
        },
        successMessage : null
    };

    componentDidMount() {
        if (this.props.location.state && this.props.location.state.successMsg) {
            this.setState({ successMessage : this.props.location.state.successMsg });
            window.setTimeout(() => {
                this.handleAlertClose();
            }, 5000);
        }
        fetchAllRoster()
            .then(roster => this.setState({ roster, showLoading : false }));
    }

    showDeletePlayerConfirm = player => {
        this.setState({
            actionConfirm : {
                show : true,
                message : `Do you really want to delete player ${player.name}?`,
                playerId : player.id
            }
        });
    }

    handleDeletePlayerConfirmed = () => {
        const { actionConfirm, roster } = this.state,
            player = roster.filter(rosterEntry => rosterEntry.id === actionConfirm.playerId)[0];

        const promise1 = firebase.storage()
                .refFromURL(player.imageUrl)
                .delete();
        const promise2 = deleteById(refTypes.roster, actionConfirm.playerId);

        Promise.all([promise1, promise2])
            .then(() => {
                const newRoster = roster.filter(r => r.id !== actionConfirm.playerId);
                this.setState({ roster : newRoster });
            })
            .catch(err => this.setState({ errorMessage : err.message }));

        this.handleDeletePlayerCanceled();
    };

    handleDeletePlayerCanceled = () => {
        this.setState({
            actionConfirm : {
                show : false,
                message : null,
                playerId : null
            }
        });
    };

    handleAlertClose = () => {
        this.setState({ errorMessage : null, successMessage : null });
    };

    render() {
        const { showLoading, roster, errorMessage,
            actionConfirm, successMessage } = this.state;

        return (
            <>
                { errorMessage && <Alert type="error" message={errorMessage} onClose={this.handleAlertClose} /> }
                { successMessage && <Alert type="success" message={successMessage} onClose={this.handleAlertClose} /> }
                {
                    <ConfirmBox
                        display={actionConfirm.show}
                        message={actionConfirm.message}
                        handleConfirm={this.handleDeletePlayerConfirmed}
                        handleCancel={this.handleDeletePlayerCanceled} />
                }
                <h1>Manage roster</h1>
                <Grid container>
                    <Grid item xs></Grid>
                    <Grid item xs={12} md={10} lg={8}>
                        <ManageRosterWithLoading
                            showLoading={showLoading}
                            roster={roster}
                            onDelete={player => this.showDeletePlayerConfirm(player)}
                            onEdit={player => this.handleEditPlayer(player)} />
                    </Grid>
                    <Grid item xs></Grid>
                </Grid>
            </>
        );
    }

}

export default withRouter(ManageRoster);