import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Slide from 'react-reveal/Slide';

import Match from '../common/match';
import { withLoading } from '../hoc/withLoading';
import { fetchAllLastPlayed } from '../../dao/match-dao';
import { fetchList } from '../../dao/common-dao';
import { refTypes } from '../../dao/ref-types';

const LastPlayedMatches = ({matches}) =>
    matches.map((match, cnt) =>
        <Grid item xs={12} sm={6} key={cnt}>
            <Slide bottom>
                <Match match={match} />
            </Slide>
        </Grid>
    )
;

const LastPlayedMatchesWithLoading = withLoading(LastPlayedMatches);

export default class LastPlayed extends Component {

    state = {
        teams : [],
        matches : [],
        showLoading : true
    };

    componentDidMount() {
        fetchList(refTypes.team).then(teams => {
            this.setState({ teams });
            fetchAllLastPlayed()
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
        return (
            <>
                <Grid container>
                    <LastPlayedMatchesWithLoading showLoading={showLoading} matches={matches} />
                </Grid>
            </>
        );
    }

}