import React from 'react';
import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const PlayerStatisticRow = ({stats, rowNum}) =>
    <TableRow>
        <TableCell numeric>{rowNum}</TableCell>
        <TableCell>{stats.name} ({stats.no})</TableCell>
        <TableCell>{stats.position}</TableCell>
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