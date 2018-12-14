import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';

import './PlayerCard.css';
import PlayerStats from './PlayerStats';

const PlayerCard = ({player}) =>
    <Card className="player-card">
        <CardHeader
          avatar={
            <Avatar aria-label="Player number" className="player-number">
              {player.number}
            </Avatar>
          }
          title={player.name}
          subheader={player.position}
          classes={{
              title : 'player-card-header-title'
          }}
        />
        <div className="player-number"></div>
        <CardActionArea>
            <CardMedia
                image={`${player.imageUrl || '/img/players/unknown.png'}`}
                title={player.name}
                className="players-photo"
            />
            <CardContent className="player-card-content">
                {/*<h5>{player.name}</h5>
                <h6>{player.position}</h6>*/}
                <PlayerStats stats={player.stats} />
            </CardContent>
        </CardActionArea>
    </Card>
;

PlayerCard.propTypes = {}; // TODO

export default PlayerCard;