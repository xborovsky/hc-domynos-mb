import React, { Component } from 'react';

import { Header, Footer } from './components/layout';
import Routes from './components/Routes';
import AdminRoutes from './components/admin/AdminRoutes';
import AdminMenu from './components/admin/AdminMenu';

import './App.css';

class App extends Component {
  render() {
    const isAdmin = true; // TODO resit pres prihlaseni
    return (
      <>
        <div className="content">
          <Header />
          <Routes />
          {
            isAdmin &&
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
    );
  }
}

export default App;
