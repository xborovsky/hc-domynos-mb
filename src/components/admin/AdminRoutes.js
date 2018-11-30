import React from 'react';
import { Route, Redirect } from "react-router-dom";

import ManageRoster from './manage-roster';
import ManageMatches from './manage-matches';
import AddPlayerForm from './manage-roster/AddPlayerForm';
import AddMatchForm from './manage-matches/AddMatchForm';
import EditMatchForm from './manage-matches/edit-match/EditMatchForm';

const AdminRoutes = () =>
    <>
        <Route exact path="/admin/" render={() => <Redirect to="/admin/manage-roster"/>} />
        <Route path="/admin/manage-roster" exact component={ManageRoster} />
        <Route path="/admin/manage-roster/add-player" component={AddPlayerForm} />
        <Route path="/admin/manage-matches" exact component={ManageMatches} />
        <Route path="/admin/manage-matches/add-match" component={AddMatchForm} />
        <Route path="/admin/manage-matches/edit/:matchId" component={EditMatchForm} />
    </>
;

export default AdminRoutes;