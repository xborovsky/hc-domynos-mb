import React from 'react';
import { Route, Redirect } from "react-router-dom";

import ManageRoster from './manage-roster';
import ManageMatches from './manage-matches';
import AddPlayerForm from './manage-roster/AddPlayerForm';
import AddEditMatchForm from './manage-matches/AddEditMatchForm';

const AdminRoutes = () =>
    <>
        <Route exact path="/admin/" render={() => <Redirect to="/admin/manage-roster"/>} />
        <Route path="/admin/manage-roster" exact component={ManageRoster} />
        <Route path="/admin/manage-roster/add-player" component={AddPlayerForm} />
        <Route path="/admin/manage-matches" exact component={ManageMatches} />
        <Route path="/admin/manage-matches/add-edit-match" component={AddEditMatchForm} />
    </>
;

export default AdminRoutes;