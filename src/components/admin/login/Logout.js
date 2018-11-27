import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {withRouter} from 'react-router-dom';

import { logOutUser } from './redux/thunk';
import Loader from '../../common/loader';

class Logout extends Component {

    componentDidMount() {
        this.props.logOut();
    }

    render() {
        return (
            this.props.loggedIn ?
                <Loader /> :
                <Redirect to="/login?logoutSuccess=true" />
        );
    }

}

const mapStateToProps = state => ({
    loggedIn : state.authReducer.loggedIn
});

const mapDispatchToProps = dispatch => ({
    logOut : () => dispatch(logOutUser())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Logout));