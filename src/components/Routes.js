import React from 'react';
import { Route } from "react-router-dom";

import Home from './home';
import Stats from './stats';
import Matches from './matches';
import Roster from './roster';
import Login from './admin/login';
import Logout from './admin/login/Logout';

const Routes = () =>
    <>
        <Route exact path="/" component={Home} />
        <Route path="/stats" component={Stats} />
        <Route path="/roster" component={Roster} />
        <Route path="/matches" component={Matches} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
    </>
;

export default Routes;