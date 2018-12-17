import React from 'react';
import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Avatar from '@material-ui/core/Avatar';

const GoalkeeperStatisticRow = ({stats, rowNum}) =>
    <TableRow>
        <TableCell numeric>{rowNum}</TableCell>
        <TableCell><Avatar alt={stats.player.name} src={`${stats.player.imageUrl || '/img/players/unknown.png'}`} /></TableCell>
        <TableCell>{stats.player.name} ({stats.player.number})</TableCell>
        <TableCell>{stats.player.position}</TableCell>
        <TableCell numeric>{stats.gp}</TableCell>
        <TableCell numeric>{stats.ga}</TableCell>
        <TableCell numeric>{stats.sa}</TableCell>
        <TableCell numeric>{((stats.sa - stats.ga) / stats.sa * 100).toFixed(2)}</TableCell>
        <TableCell numeric>{stats.so}</TableCell>
        <TableCell numeric>{(stats.ga / stats.gp).toFixed(2)}</TableCell>
    </TableRow>
;

GoalkeeperStatisticRow.propTypes = {
    stats : PropTypes.arrayOf(PropTypes.object).isRequired,
    rowNum : PropTypes.number.isRequired
};

export default GoalkeeperStatisticRow;