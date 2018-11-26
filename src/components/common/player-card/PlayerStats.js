import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const PlayerStats = ({stats}) =>
    <Paper className="player-stats">
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell numeric>GP</TableCell>
                    <TableCell numeric>G</TableCell>
                    <TableCell numeric>A</TableCell>
                    <TableCell numeric>P</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell numeric>{stats.gp || 0}</TableCell>
                    <TableCell numeric>{stats.g || 0}</TableCell>
                    <TableCell numeric>{stats.a || 0}</TableCell>
                    <TableCell numeric>{(stats.g || 0) + (stats.a || 0)}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </Paper>
;

PlayerStats.propTypes = {}; // TODO

export default PlayerStats;