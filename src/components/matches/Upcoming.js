import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Slide from 'react-reveal/Slide';

import Match from '../common/match';
import { withLoading } from '../hoc/withLoading';
import { fetchAllUpcoming } from '../../dao/match-dao';

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
        matches : [],
        showLoading : true
    };

    componentDidMount() {
        fetchAllUpcoming()
            .then(matches => {
                this.setState({
                    matches,
                    showLoading : false
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