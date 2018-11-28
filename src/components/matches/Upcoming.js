import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Slide from 'react-reveal/Slide';

import Match from '../common/match';
import { withLoading } from '../hoc/withLoading';
import { fetchAllUpcoming } from '../../dao/match-dao';
import { fetchList } from '../../dao/common-dao';
import { refTypes } from '../../dao/ref-types';

const UpcomingMatches = ({matches}) =>
    matches.map((match, cnt) =>
        <Grid item xs={12} sm={6} key={cnt}>
            <Slide bottom>
                <Match match={match} />
            </Slide>
        </Grid>
    )
;

const UpcomingMatchesWithLoading = withLoading(UpcomingMatches);

export default class Upcoming extends Component {

    state = {
        teams : [],
        matches : [],
        showLoading : true
    };

    componentDidMount() {
        fetchList(refTypes.team).then(teams => {
            this.setState({ teams });
            fetchAllUpcoming()
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

    render() {
        const { matches, showLoading } = this.state;
        // todo infinite scroll?
        return (
            <>
                <Grid container>
                    <UpcomingMatchesWithLoading showLoading={showLoading} matches={matches} />
                </Grid>
            </>
        );
    }

}