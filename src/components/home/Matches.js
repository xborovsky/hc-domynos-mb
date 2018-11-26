import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

import Btn from '../common/button';
import Match from '../common/match';
import { withLoading } from '../hoc/withLoading';
import { fetchUpcomingAndLastPlayed } from '../../dao/match-dao';

//const LOAD_LIMIT = 6;

const MatchesList = ({matches}) =>
    matches.map(match =>
        <Grid item xs={12} sm={6} key={match.id}>
            <Match match={match} />
        </Grid>
    )
;

const MatchesListWithLoading = withLoading(MatchesList);

export default class Matches extends Component {
    state = {
        matches : [],
        showLoading : true
    }

    componentDidMount() {
        fetchUpcomingAndLastPlayed()
            .then(matches => {
                this.setState({
                    matches,
                    showLoading : false
                });
            });
    }
        /*firebase.database().ref('matches')
            .orderByKey().limitToFirst(LOAD_LIMIT)
            .once('value')
            .then(matchesRes => {
                this.handleMatchesResults(matchesRes.val());
            });
    }

    handleMatchesResults = (matches) => {
        let current = [...this.state.matches];
        Object.keys(matches).forEach(matchId => {
            current.push({id : matchId, ...matches[matchId]});
        });

        this.setState({
            matches : current,
            showLoading : false
        });
    }*/

    linkToMatches = () => {
        // TODO
    }

    render() {
        const { matches, showLoading } = this.state;
        return (
            <div className="section">
                <h2>Matches</h2>
                <Grid container>
                    <MatchesListWithLoading showLoading={showLoading} matches={matches} />
                    <Grid item xs={12}>
                        <Btn className="center-block" onClick={this.linkToMatches}>View all</Btn>
                    </Grid>
                </Grid>
            </div>
        );
    }

}