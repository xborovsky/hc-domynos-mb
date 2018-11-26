import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Fade from 'react-reveal/Fade';

import Loader from '../common/loader';
import PlayersByPosition from './PlayersByPosition';
import { fetchAllWithStats } from '../../dao/roster-dao';

import './Roster.css';

export default class Roster extends Component {

    state = {
        players : [],
        showLoading : true
    }

    componentDidMount() {
        fetchAllWithStats()
            .then(roster => {
                this.setState({
                    players : roster,
                    showLoading : false
                })
            });
    }

    getPlayersByPositions = positions => {
        return this.state.players.filter(player => positions.indexOf(player.position) !== -1);
    }

    render() {
        const { showLoading } = this.state;

        return (
            showLoading ?
                <Loader /> :
                <div className="section roster">
                    <Grid container>
                        <Grid item xs></Grid>
                        <Grid item xs={10}>
                            <Fade bottom>
                                <PlayersByPosition position="Goalkeeper" players={this.getPlayersByPositions(["GK"])} />
                            </Fade>
                            <Fade bottom>
                                <PlayersByPosition position="Defencemen" players={this.getPlayersByPositions(["LD", "RD"])} />
                            </Fade>
                            <Fade bottom>
                                <PlayersByPosition position="Forwards" players={this.getPlayersByPositions(["LW", "C", "RW"])} />
                            </Fade>
                        </Grid>
                        <Grid item xs></Grid>
                    </Grid>
                </div>
        );
    }

}