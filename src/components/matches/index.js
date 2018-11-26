import React, { Component } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import MatchesRoutes from './MatchesRoutes';

export default class Matches extends Component {
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
                    <Tab label="Upcoming" component="a" href="/matches/upcoming" />
                    <Tab label="Last played" component="a" href="/matches/last-played" />
                </Tabs>
                <MatchesRoutes />
            </div>
        );
    }
}