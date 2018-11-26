import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PlayersStats from './PlayersStats';
import GoalkeeperStats from './GoalkeeperStats';

const StatsRoutes = () =>
    <Router>
        <Switch>
            <Route path="/stats/players" component={PlayersStats} />
            <Route path="/stats/goalkeepers" component={GoalkeeperStats} />
        </Switch>
    </Router>
;

export default StatsRoutes;