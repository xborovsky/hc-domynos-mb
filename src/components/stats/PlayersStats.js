import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

import Loader from '../common/loader';
import PlayerStatisticRow from './PlayerStatisticRow';
import { sortData } from '../../util/data-sorter';
import { fetchPlayerStats } from '../../dao/stats-dao';

import './Stats.css';

class PlayersStats extends Component {

    state = {
        stats : [],
        showLoading : true,
        sortBy : 'name',
        sortAsc : false,
        thConfig : [
            { id : 'photo', title : '', isNumeric : false},
            { id : 'name', title : 'Name', isNumeric : false},
            { id : 'position', title : 'Position', isNumeric : false},
            { id : 'gp', title : 'Games Played', isNumeric : true},
            { id : 'g', title : 'Goals', isNumeric : true},
            { id : 'a', title : 'Assists', isNumeric : true},
            { id : 'p', title : 'Points', isNumeric : true}
        ]
    }

    componentDidMount() {
        fetchPlayerStats().then(res => this.setState({
            stats : res,
            showLoading : false
        }));
    }

    sortBy = sortColumn => {
        const { sortBy } = this.state;
        let sortAsc = (sortColumn === sortBy) ? !this.state.sortAsc : false;
        const sorted = sortColumn === 'p' ?
            this.sortByPoints(sortAsc) :
            sortData(this.state.stats, sortColumn, sortAsc);

        this.setState({
            stats : sorted,
            sortBy : sortColumn,
            sortAsc
        });
    }

    sortByPoints = sortAsc => {
        const statsCopy = [...this.state.stats];

        statsCopy.sort((item1, item2) => {
            if (sortAsc) {
                return item1['g'] + item1['a'] < item2['g'] + item2['a'] ? -1 :
                    item1['g'] + item1['a'] > item2['g'] + item2['a'] ? 1 :
                    0;
            } else {
                return item1['g'] + item1['a'] < item2['g'] + item2['a'] ? 1 :
                    item1['g'] + item1['a'] > item2['g'] + item2['a'] ? -1 :
                    0;
            }
        });

        return statsCopy;
    }

    displaySortByIcon = columnName => {
        const { sortBy, sortAsc } = this.state;
        if (columnName === sortBy) {
            return sortAsc ? <ArrowDropUpIcon className="th-icon" /> : <ArrowDropDownIcon className="th-icon" />;
        }

        return null;
    }

    render() {
        const { stats, showLoading, thConfig } = this.state;

        return (
            <>
                <h2>Players stats</h2>
                { showLoading ?
                    <Loader /> :
                    <Paper className="stats">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell numeric>&nbsp;</TableCell>
                                    {
                                        thConfig.map(th =>
                                            <TableCell onClick={() => this.sortBy(th.id)}
                                                       numeric={th.isNumeric}
                                                       key={th.id}>
                                                <span className="th-text">{th.title}</span> {this.displaySortByIcon(th.id)}
                                            </TableCell>
                                        )
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { stats.map((playerStats, cnt) => <PlayerStatisticRow stats={playerStats} rowNum={cnt+1} />) }
                            </TableBody>
                        </Table>
                    </Paper>
                }
            </>
        );
    }

}

export default PlayersStats;