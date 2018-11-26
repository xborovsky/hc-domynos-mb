import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Upcoming from './Upcoming';
import LastPlayed from './LastPlayed';

const StatsRoutes = () =>
    <Router>
        <Switch>
            <Route path="/matches/upcoming" component={Upcoming} />
            <Route path="/matches/last-played" component={LastPlayed} />
        </Switch>
    </Router>
;

export default StatsRoutes;