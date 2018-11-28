import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
import PollIcon from '@material-ui/icons/Poll';
import EventIcon from '@material-ui/icons/Event';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Menu = ({open, onMenuToggle}) =>
    <Drawer anchor="left" open={open} onClick={() => onMenuToggle(false)}>
        <List>
            <Link to="/team">
                <ListItem button>
                    <ListItemIcon><ImportContactsIcon /></ListItemIcon>
                    <ListItemText>Team</ListItemText>
                </ListItem>
            </Link>
            <Link to="/roster">
                <ListItem button>
                    <ListItemIcon><PeopleIcon /></ListItemIcon>
                    <ListItemText>Players</ListItemText>
                </ListItem>
            </Link>
            <Link to="/matches/upcoming">
                <ListItem button>
                    <ListItemIcon><EventIcon /></ListItemIcon>
                    <ListItemText>Matches</ListItemText>
                </ListItem>
            </Link>
            <Link to="/stats">
                <ListItem button>
                    <ListItemIcon><PollIcon /></ListItemIcon>
                    <ListItemText>Stats</ListItemText>
                </ListItem>
            </Link>
        </List>
    </Drawer>
;

Menu.propTypes = {
    open : PropTypes.bool.isRequired,
    onMenuToggle : PropTypes.func.isRequired
};

export default Menu;