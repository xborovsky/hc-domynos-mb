import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';

const RosterTable = ({ roster, onDelete, onEdit }) =>
    <Paper className="roster-table">
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>&nbsp;</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell numeric>Number</TableCell>
                    <TableCell>Position</TableCell>
                    <TableCell numeric>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    roster.map(player =>
                        <TableRow key={player.number}>
                            <TableCell><Avatar alt={player.name} src={`${player.imageUrl || '/img/players/unknown.png'}`} /></TableCell>
                            <TableCell>{player.name}</TableCell>
                            <TableCell numeric>{player.number}</TableCell>
                            <TableCell>{player.position}</TableCell>
                            <TableCell numeric>
                                <EditIcon title="Edit" className="action-icon" onClick={() => onEdit(player)} />
                                <CancelIcon title="Delete" className="action-icon" onClick={() => onDelete(player)} />
                            </TableCell>
                        </TableRow>
                    )
                }
            </TableBody>
        </Table>
    </Paper>
;

export default RosterTable;