import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';

import { withLoading } from '../hoc/withLoading';
import { fetchList } from '../../dao/common-dao';
import { refTypes } from '../../dao/ref-types';

const TeamsList = ({teams}) => (
    <Paper>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell numeric>&nbsp;</TableCell>
                    <TableCell>Logo</TableCell>
                    <TableCell>Team</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    teams.map((team, cnt) =>
                        <TableRow key={team.id}>
                            <TableCell numeric>{ cnt+1 }</TableCell>
                            <TableCell><Avatar alt={team.name} src={team.logo} /></TableCell>
                            <TableCell>{team.name}</TableCell>
                        </TableRow>
                    )
                }
            </TableBody>
        </Table>
    </Paper>
);

const TeamsListWithLoading = withLoading(TeamsList);

export default class Teams extends Component {
    state = {
        teams : [],
        showLoading : true
    }

    componentDidMount() {
        fetchList(refTypes.team)
            .then(teams => {
                this.setState({
                    teams,
                    showLoading : false
                });
            });
    }

    render() {
        const { teams, showLoading } = this.state;
        return (
            <div className="section">
                <h2>Teams</h2>
                <Grid container>
                    <Grid item xs></Grid>
                    <Grid item xs={12} md={10} lg={8}>
                        <TeamsListWithLoading showLoading={showLoading} teams={teams} />
                    </Grid>
                    <Grid item xs></Grid>
                </Grid>
            </div>
        );
    }

}