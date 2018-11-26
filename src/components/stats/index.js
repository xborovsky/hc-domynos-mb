import React, { Component } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import StatsRoutes from './StatsRoutes';

class Stats extends Component {

    state = {
        selectedTab : 0
    }

    handleTabChange = (event, value) => {
        this.setState({ selectedTab : value });
    }

    render() {
        const { selectedTab } = this.state;

        return (
            <div className="stats-wrapper">
                <Tabs centered value={selectedTab} onChange={this.handleTabChange}>
                    <Tab label="Players stats" component="a" href="/stats/players" />
                    <Tab label="Goalkeeper stats" component="a" href="/stats/goalkeepers" />
                </Tabs>
                <StatsRoutes />
            </div>
        );
    }
}

export default Stats;