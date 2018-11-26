import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import './PlayerCard.css';
import PlayerStats from './PlayerStats';

const PlayerCard = ({player}) =>
    <Card className="player-card">
        <div className="player-number">{player.number}</div>
        <CardActionArea>
            <CardMedia
                image={`/img/players/${player.image || 'unknown'}`}
                title={player.name}
                className="players-photo"
            />
            <CardContent className="player-card-content">
                <h5>{player.name}</h5>
                <h6>{player.position}</h6>
                <PlayerStats stats={player.stats} />
            </CardContent>
        </CardActionArea>
    </Card>
;

PlayerCard.propTypes = {}; // TODO

export default PlayerCard;