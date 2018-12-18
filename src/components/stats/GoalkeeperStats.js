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
import GoalkeeperStatisticRow from './GoalkeeperStatisticRow';
import { sortData } from '../../util/data-sorter';
import { fetchGKStats } from '../../dao/stats-dao';

export default class GoalkeeperStats extends Component {

    state = {
        stats : [],
        showLoading : true,
        thConfig : [
            { id : 'photo', title : '', isNumeric : false },
            { id : 'name', title : 'Name', isNumeric : false },
            { id : 'position', title : 'Position', isNumeric : false },
            { id : 'gp', title : 'Games Played', isNumeric : true },
            { id : 'ga', title : 'Goals Against', isNumeric : true },
            { id : 'sa', title : 'Shots Against', isNumeric : true },
            { id : 's-pct', title : 'Saves %', isNumeric : true },
            { id : 'so', title : 'Shutouts', isNumeric : true },
            { id : 'gaa', title : 'Goals Against Average', isNumeric : true }
        ]
    }

    componentDidMount() {
        fetchGKStats().then(res => {console.log(res);this.setState({
            stats : res,
            showLoading : false
        })});
    }

    sortBy = sortColumn => {
        const { sortBy } = this.state;
        let sortAsc = (sortColumn === sortBy) ? !this.state.sortAsc : false;
        const sorted = sortColumn === 's-pct' ?
            this.sortBySavePct(sortAsc) :
            sortColumn === 'gaa' ?
                this.sortByGoalsAgainstAverage(sortAsc) :
                sortData(this.state.stats, sortColumn, sortAsc);

        this.setState({
            stats : sorted,
            sortBy : sortColumn,
            sortAsc
        });
    }

    sortBySavePct = sortAsc => {
        const statsCopy = [...this.state.stats];

        statsCopy.sort((item1, item2) => {
            if (sortAsc) {
                return (item1['sa'] - item1['ga']) / item1['sa'] < (item2['sa'] - item2['ga']) / item2['sa'] ? -1 :
                    (item1['sa'] - item1['ga']) / item1['sa'] > (item2['sa'] - item2['ga']) / item2['sa'] ? 1 :
                    0;
            } else {
                return (item1['sa'] - item1['ga']) / item1['sa'] < (item2['sa'] - item2['ga']) / item2['sa'] ? 1 :
                    (item1['sa'] - item1['ga']) / item1['sa'] > (item2['sa'] - item2['ga']) / item2['sa'] ? -1 :
                    0;
            }
        });

        return statsCopy;
    }

    sortByGoalsAgainstAverage = sortAsc => {
        const statsCopy = [...this.state.stats];

        statsCopy.sort((item1, item2) => {
            if (sortAsc) {
                return item1['ga'] + item1['gp'] < item2['ga'] + item2['gp'] ? -1 :
                    item1['ga'] + item1['gp'] > item2['ga'] + item2['gp'] ? 1 :
                    0;
            } else {
                return item1['ga'] + item1['gp'] < item2['ga'] + item2['gp'] ? 1 :
                    item1['ga'] + item1['gp'] > item2['ga'] + item2['gp'] ? -1 :
                    0;
            }
        });

        return statsCopy;
    }

    displaySortByIcon = columnName => {
        const { sortBy, sortAsc } = this.state;
        if (columnName === sortBy) {
            return sortAsc ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;
        }

        return null;
    }

    render() {
        const { stats, showLoading, thConfig } = this.state;

        return (
            <>
                <h2>Goalkeeper stats</h2>
                { showLoading ?
                    <Loader /> :
                    <Paper className="stats">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>&nbsp;</TableCell>
                                    {
                                        thConfig.map(th =>
                                            <TableCell onClick={() => this.sortBy(th.id)}
                                                       numeric={th.isNumeric}
                                                       key={th.id}>
                                                <span className="th-text">{th.title}</span> <span className="th-icon">{this.displaySortByIcon(th.id)}</span>
                                            </TableCell>
                                        )
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { stats.map((gkStats, cnt) => <GoalkeeperStatisticRow stats={gkStats} rowNum={cnt+1} key={cnt} />) }
                            </TableBody>
                        </Table>
                    </Paper>
                }
            </>
        );
    }

}