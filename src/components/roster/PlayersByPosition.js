import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import PlayerCard from '../common/player-card';

const PlayersByPosition = ({ position, players }) =>
    <>
        <h2>{ position }</h2>
        <Grid container spacing={40}>
            {
                players.map(player =>
                    <Grid item key={player.id} xs={12} sm={6} md={4} lg={3}>
                        { console.log(player) }
                        <PlayerCard player={player} />
                    </Grid>
                )
            }
        </Grid>
    </>
;

// TODO
PlayersByPosition.propTypes = {
    position : PropTypes.string.isRequired,
    players : PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PlayersByPosition;