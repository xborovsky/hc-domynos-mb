import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
import Divider from '@material-ui/core/Divider';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import StorageIcon from '@material-ui/icons/Storage';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import Collapse from '@material-ui/core/Collapse';
import { Link } from 'react-router-dom';

import './AdminMenu.css';

export default class AdminMenu extends Component {

    state = {
        selectedMain : null,
        selectedSubmenu : null,
        submenu : {
            manageRoster : false,
            manageMatches : false
        }
    };

    unpackSubmenu = type => {
        const { submenu } = this.state;
        if (!submenu[type]) {
            const submenuCpy = {...submenu};
            Object.keys(submenuCpy).forEach(submenuItem => {
                submenuCpy[submenuItem] = submenuItem === type;
            });

            this.setState({submenu : submenuCpy});
        }
    }

    markSelected = (menuItem, submenu) => {
        this.setState({ selectedMain : menuItem, selectedSubmenu : submenu });
    };

    isSelected = menuItem => {
        return menuItem === this.state.selectedMain ||
            menuItem === this.state.selectedSubmenu;
    };

    render() {
        const { submenu } = this.state;

        return (
            <Drawer anchor="left" variant="permanent" className="admin-menu">
                <List>
                    <Link to='/admin/manage-roster'>
                        <ListItem button onClick={() => { this.unpackSubmenu('manageRoster'); this.markSelected('manageRoster'); } }
                            className={this.isSelected('manageRoster') ? 'selected-main' : null}>
                            <ListItemIcon><PeopleIcon /></ListItemIcon>
                            <ListItemText>Manage roster</ListItemText>
                            {submenu.manageRoster ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </ListItem>
                    </Link>

                    <Collapse in={submenu.manageRoster} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <Link to='/admin/manage-roster/add-player'>
                                <ListItem button className="admin-menu-nested" onClick={() => this.markSelected('manageRoster', 'addPlayer')}
                                    className={this.isSelected('addPlayer') ? 'selected-sub' : null}>
                                    <ListItemIcon>
                                        <PersonAddIcon />
                                    </ListItemIcon>
                                    <ListItemText inset primary="Add player" />
                                </ListItem>
                            </Link>
                        </List>
                    </Collapse>

                    <ListItem button onClick={() => this.markSelected('manageTeam')}
                        className={this.isSelected('manageTeam') ? 'selected-main' : null}>
                        <ListItemIcon><ImportContactsIcon /></ListItemIcon>
                        <ListItemText>Manage team</ListItemText>
                    </ListItem>

                    <Link to='/admin/manage-matches'>
                        <ListItem button onClick={() => { this.unpackSubmenu('manageMatches'); this.markSelected('manageMatches'); } }
                            className={this.isSelected('manageMatches') ? 'selected-main' : null}>
                            <ListItemIcon><StorageIcon /></ListItemIcon>
                            <ListItemText>Manage matches</ListItemText>
                            {submenu.manageMatches ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </ListItem>
                    </Link>

                    <Collapse in={submenu.manageMatches} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <Link to='/admin/manage-matches/add-match'>
                                <ListItem button className="admin-menu-nested" onClick={() => this.markSelected('manageMatches', 'addMatch')}
                                    className={this.isSelected('addMatch') ? 'selected-sub' : null}>
                                    <ListItemIcon>
                                        <PlaylistAddIcon />
                                    </ListItemIcon>
                                    <ListItemText inset primary="Add match" />
                                </ListItem>
                            </Link>
                        </List>
                    </Collapse>

                    <Divider />

                    <Link to='/logout'>
                        <ListItem button>
                            <ListItemIcon><PowerSettingsNewIcon /></ListItemIcon>
                            <ListItemText>Logout</ListItemText>
                        </ListItem>
                    </Link>
                </List>
            </Drawer>
        );
    }
}