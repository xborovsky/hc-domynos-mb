import React from 'react';
import { Route, Switch } from "react-router-dom";

import Upcoming from './Upcoming';
import LastPlayed from './LastPlayed';

const StatsRoutes = () =>
    <Switch>
        <Route path="/matches/upcoming" component={Upcoming} />
        <Route path="/matches/last-played" component={LastPlayed} />
    </Switch>
;

export default StatsRoutes;