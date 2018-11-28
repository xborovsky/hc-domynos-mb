import React from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Slide from 'react-reveal/Slide';

import './Match.css';

const Match = ({ match }) =>
    <Slide bottom>
        <Grid container className="match-wrapper">
            <Grid item xs={1} sm={2} lg={3}></Grid>
            <Grid item xs={10} sm={8} lg={6}>
                <Grid container spacing={40} className="match-grid-wrapper">
                    <Grid item xs={12} className="match-place-wrapper">
                        <div className="match-place">{match.place}</div>
                        <div className="match-time">({match.datetime})</div>
                    </Grid>
                    <Grid item xs={12} className="match-score-wrapper">
                        <Grid container alignItems="stretch">
                            <Grid item xs={10}>
                                <div className="match-team home">
                                    <Avatar alt={match.homeTeamName} src={`/img/logos/${match.localThmb}`} className="match-team-logo" />
                                    {match.homeTeamName}
                                </div>
                            </Grid>
                            <Grid item xs={2} className="match-score">
                                <div>{match.homeScore}</div>
                            </Grid>
                        </Grid>
                        <Grid container alignItems="stretch">
                            <Grid item xs={10}>
                                <div className="match-team away">
                                    <Avatar alt={match.awayTeamName} src={`/img/logos/${match.awayThmb}`} className="match-team-logo" />
                                    {match.awayTeamName}
                                </div>
                            </Grid>
                            <Grid item xs={2} className="match-score">
                                <div>{match.awayScore}</div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={1} sm={2} lg={3}></Grid>
        </Grid>
    </Slide>
;

export default Match;