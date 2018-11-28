import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Slide from 'react-reveal/Slide';
import { withRouter } from 'react-router-dom';

import Btn from '../common/button';
import PlayersGallery from './PlayersGallery';
import { withLoading } from '../hoc/withLoading';
import { fetchAllWithStats } from '../../dao/roster-dao';

const PlayerSection = ({players}) =>
    <>
        <Grid item xs={12} sm={6}>
            <PlayersGallery players={players} />
        </Grid>
        <Grid item xs={12} sm={6}>
            <Slide right>
                <div className="players-intro">
                    <div className="tag">Meet</div>
                    <div className="tag" style={{ marginLeft : '7rem' }}>the</div>
                    <div className="tag" style={{ marginLeft : '3rem' }}>players</div>
                </div>
            </Slide>
        </Grid>
    </>
;

const PlayerSectionWithLoading = withLoading(PlayerSection);

class Players extends Component {

    state = {
        players : [],
        showLoading : true
    }

    componentDidMount() {
        fetchAllWithStats()
            .then(roster => {
                this.setState({
                    players : roster,
                    showLoading : false
                })
            });
    }

    linkToPlayers = () => {
        this.props.history.push('/roster');
    }

    render() {
        const { players, showLoading } = this.state;

        return (
            <div className="section">
                <h2>Players</h2>
                <Grid container spacing={40}>
                    <PlayerSectionWithLoading showLoading={showLoading} players={players} />
                    <Grid item xs={12}>
                        <Btn className="center-block" onClick={this.linkToPlayers}>View all</Btn>
                    </Grid>
                </Grid>
            </div>
        );
    }

}

export default withRouter(Players);