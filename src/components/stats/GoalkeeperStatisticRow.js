import React from 'react';
import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const GoalkeeperStatisticRow = ({stats, rowNum}) =>
    <TableRow>
        <TableCell numeric>{rowNum}</TableCell>
        <TableCell>{stats.name} ({stats.no})</TableCell>
        <TableCell>{stats.position}</TableCell>
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