import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';

import Btn from '../common/button';
import Match from '../common/match';
import { withLoading } from '../hoc/withLoading';
import { fetchUpcomingAndLastPlayed } from '../../dao/match-dao';
import { fetchList } from '../../dao/common-dao';
import { refTypes } from '../../dao/ref-types';

const MatchesList = ({matches}) =>
    matches.map(match =>
        <Grid item xs={12} sm={6} key={match.id}>
            <Match match={match} />
        </Grid>
    )
;

const MatchesListWithLoading = withLoading(MatchesList);

class Matches extends Component {
    state = {
        teams: [],
        matches : [],
        showLoading : true
    }

    componentDidMount() {
        fetchList(refTypes.team).then(teams => {
            this.setState({ teams });
            fetchUpcomingAndLastPlayed()
                .then(matches => {
                    matches.forEach(match => {
                        const homeTeam = teams.filter(team => team.id === match.home)[0].name;
                        const awayTeam = teams.filter(team => team.id === match.away)[0].name;
                        match.homeTeamName = homeTeam;
                        match.awayTeamName = awayTeam;
                    });
                    this.setState({ matches, showLoading : false });
                });
            });
    }

    linkToMatches = () => {
        this.props.history.push('/matches/upcoming');
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

export default withRouter(Matches);