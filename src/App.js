import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { Header, Footer } from './components/layout';
import Routes from './components/Routes';
import AdminRoutes from './components/admin/AdminRoutes';
import AdminMenu from './components/admin/AdminMenu';

import './App.css';

class App extends Component {

  render() {
    const { loggedIn } = this.props;

    return (
      <Router>
        <>
          <div className="content">
            <Header />
            <Routes />
            {
              loggedIn &&
              <>
                <AdminMenu />
                <div className="admin-content">
                  <AdminRoutes />
                </div>
              </>
            }
          </div>
          <Footer />
        </>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn : state.authReducer.loggedIn
});

export default connect(mapStateToProps)(App);
