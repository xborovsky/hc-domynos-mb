import React from 'react';
import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Avatar from '@material-ui/core/Avatar';

const PlayerStatisticRow = ({stats, rowNum}) =>
    <TableRow>
        <TableCell numeric>{rowNum}</TableCell>
        <TableCell><Avatar alt={stats.player.name} src={`${stats.player.imageUrl || '/img/players/unknown.png'}`} /></TableCell>
        <TableCell>{stats.player.name} ({stats.player.number})</TableCell>
        <TableCell>{stats.player.position}</TableCell>
        <TableCell numeric>{stats.gp}</TableCell>
        <TableCell numeric>{stats.g}</TableCell>
        <TableCell numeric>{stats.a}</TableCell>
        <TableCell numeric>{stats.g + stats.a}</TableCell>
    </TableRow>
;

PlayerStatisticRow.propTypes = {
    stats : PropTypes.arrayOf(PropTypes.object).isRequired,
    rowNum : PropTypes.number.isRequired
};

export default PlayerStatisticRow;