import React from 'react';
import { Route, Switch } from "react-router-dom";

import PlayersStats from './PlayersStats';
import GoalkeeperStats from './GoalkeeperStats';

const StatsRoutes = () =>
    <Switch>
        <Route path="/stats/players" component={PlayersStats} />
        <Route path="/stats/goalkeepers" component={GoalkeeperStats} />
    </Switch>
;

export default StatsRoutes;