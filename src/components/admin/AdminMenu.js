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

export default class AdminMenu extends Component {

    state = {
        submenu : {
            manageRoster : false,
            manageMatches : false
        }
    };

    handleMainMenuClick = type => {
        this.setState(prevState => {
            return {
                ...prevState,
                submenu : {
                    ...prevState.submenu,
                    [type] : !prevState.submenu[type]
                }
            };
        });
    }

    render() {
        const { submenu } = this.state;

        return (
            <Drawer anchor="left" variant="permanent" className="admin-menu">
                <List>
                    <Link to='/admin/manage-roster'>
                        <ListItem button onClick={() => this.handleMainMenuClick('manageRoster')}>
                            <ListItemIcon><PeopleIcon /></ListItemIcon>
                            <ListItemText>Manage roster</ListItemText>
                            {submenu.manageRoster ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </ListItem>
                    </Link>

                    <Collapse in={submenu.manageRoster} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <Link to='/admin/manage-roster/add-player'>
                                <ListItem button className="admin-menu-nested">
                                    <ListItemIcon>
                                        <PersonAddIcon />
                                    </ListItemIcon>
                                    <ListItemText inset primary="Add player" />
                                </ListItem>
                            </Link>
                        </List>
                    </Collapse>

                    <ListItem button>
                        <ListItemIcon><ImportContactsIcon /></ListItemIcon>
                        <ListItemText>Manage team</ListItemText>
                    </ListItem>

                    <Link to='/admin/manage-matches'>
                        <ListItem button onClick={() => this.handleMainMenuClick('manageMatches')}>
                            <ListItemIcon><StorageIcon /></ListItemIcon>
                            <ListItemText>Manage matches</ListItemText>
                            {submenu.manageMatches ? <ExpandLessIcon /> : <ExpandMoreIcon />}}
                        </ListItem>
                    </Link>

                    <Collapse in={submenu.manageMatches} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <Link to='/admin/manage-matches/add-edit-match'>
                                <ListItem button className="admin-menu-nested">
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