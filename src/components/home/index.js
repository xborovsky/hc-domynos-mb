import React from 'react';
import Grid from '@material-ui/core/Grid';

import Intro from './Intro';
import Matches from './Matches';
import Players from './Players';
import Teams from './Teams';

import './Home.css';
import ErrorBoundary from '../common/ErrorBoundary';

const Home = () =>
    <Grid container>
        <Grid item xs={12}>
            <ErrorBoundary>
                <Intro />
            </ErrorBoundary>
        </Grid>
        <Grid item xs={12}>
            <ErrorBoundary>
                <Matches />
            </ErrorBoundary>
        </Grid>
        <Grid item xs={12}>
            <ErrorBoundary>
                <Players />
            </ErrorBoundary>
        </Grid>
        <Grid item xs={12}>
            <ErrorBoundary>
                <Teams />
            </ErrorBoundary>
        </Grid>
    </Grid>
;

export default Home;