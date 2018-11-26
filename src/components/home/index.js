import React from 'react';
import Grid from '@material-ui/core/Grid';

import Intro from './Intro';
import Matches from './Matches';
import Players from './Players';
import Teams from './Teams';

import './Home.css';

const Home = () =>
    <Grid container>
        <Grid item xs={12}>
            <Intro />
        </Grid>
        <Grid item xs={12}>
            <Matches />
        </Grid>
        <Grid item xs={12}>
            <Players />
        </Grid>
        <Grid item xs={12}>
            <Teams />
        </Grid>
    </Grid>
;

export default Home;