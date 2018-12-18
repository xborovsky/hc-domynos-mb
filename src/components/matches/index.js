import React, { Component } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import MatchesRoutes from './MatchesRoutes';

export default class Matches extends Component {
    state = {
        selectedTab : 0
    }

    handleTabChange = (event, value) => {
        this.setState({ selectedTab : value });
    }

    render() {
        return (
            <div className="stats-wrapper">
                <Router>
                    <>
                        <Tabs centered value={this.state.selectedTab} onChange={this.handleTabChange} className="tabs">
                            <Tab label="Upcoming" component={Link} to="/matches/upcoming" className="tab-item" />
                            <Tab label="Last played" component={Link} to="/matches/last-played" className="tab-item" />
                        </Tabs>
                        <MatchesRoutes />
                    </>
                </Router>
            </div>
        );
    }
}