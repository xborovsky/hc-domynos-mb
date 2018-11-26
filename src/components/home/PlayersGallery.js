import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Zoom from 'react-reveal/Zoom';
import PlayerCard from '../common/player-card';

const NEXT_PLAYER_INTERVAL = 5000;

export default class PlayersGallery extends Component {

    state = {
        selectedPlayerIdx : 0,
        interval : null,
        allPlayers : [],
        show : false
    }

    componentDidMount() {
        const { players } = this.props;
        let randomPlayers = [...players];

        randomPlayers.sort(function() { return 0.5 - Math.random() }); // shuffle array

        const interval = window.setInterval(() => {
            this.setState({show : false});
            window.setTimeout(() => this.setState({selectedPlayerIdx : (this.state.selectedPlayerIdx+1) % randomPlayers.length, show : true}), 500);

        }, NEXT_PLAYER_INTERVAL);

        this.setState({
            interval,
            allPlayers : randomPlayers,
            selectedPlayerIdx : (this.state.selectedPlayerIdx+1) % randomPlayers.length, show : true
        });

    }

    componentWillUnmount() {
        if (this.state.interval) {
            window.clearInterval(this.state.interval);
        }
    }

    render() {
        const { selectedPlayerIdx, allPlayers, show } = this.state;
        const currentSelected = allPlayers[selectedPlayerIdx];

        return (
            currentSelected ?
                <Grid container className="players-gallery">
                    <Grid item xs />
                        <Grid item xs={6}>
                            <Zoom opposite when={show}>
                                <PlayerCard player={currentSelected} />
                            </Zoom>
                        </Grid>
                    <Grid item xs />
                    </Grid>: null
        );
    }

}