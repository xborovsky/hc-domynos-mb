import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';

const MatchesTable = ({ matches, onEdit, onDelete }) =>
    <Paper className="roster-table">
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell numeric>&nbsp;</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Home team</TableCell>
                    <TableCell>Away team</TableCell>
                    <TableCell>Score</TableCell>
                    <TableCell>Place</TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    matches.map((match, cnt) =>
                        <TableRow key={match.id}>
                            <TableCell>{ cnt+1 }</TableCell>
                            <TableCell>{match.datetime}</TableCell>
                            <TableCell>{match.homeTeamName}</TableCell>
                            <TableCell>{match.awayTeamName}</TableCell>
                            <TableCell>{match.homeScore} : {match.awayScore} {match['is_so_lose'] || match['is_so_win'] ? 'PP' : null}</TableCell>
                            <TableCell>{match.place}</TableCell>
                            <TableCell>
                                <EditIcon title="Edit" className="action-icon" onClick={() => onEdit(match)} />
                                <CancelIcon title="Delete" className="action-icon" onClick={() => onDelete(match)} />
                            </TableCell>
                        </TableRow>
                    )
                }
            </TableBody>
        </Table>
    </Paper>
;

MatchesTable.propTypes = {
    matches : PropTypes.array.isRequired,
    onEdit : PropTypes.func.isRequired,
    onDelete : PropTypes.func.isRequired
};

export default MatchesTable;