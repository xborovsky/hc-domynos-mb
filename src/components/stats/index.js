import React, { Component } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import StatsRoutes from './StatsRoutes';

class Stats extends Component {

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
                            <Tab label="Players stats" component={Link} to="/stats/players" className="tab-item" />
                            <Tab label="Goalkeeper stats" component={Link} to="/stats/goalkeepers" className="tab-item" />
                        </Tabs>
                        <StatsRoutes />
                    </>
                </Router>
            </div>
        );
    }
}

export default Stats;