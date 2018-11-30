import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as logo from '../../resources/img/logo.png';

import Menu from './Menu';

class Header extends Component {

    state = {
        menuOpen: false
    }

    handleMenuToggle = open => {
        this.setState({ menuOpen: open });
    }

    render() {
        const { menuOpen } = this.state;
        const { loggedUser } = this.props;

        return (
            <>
                <AppBar position="fixed">
                    <Toolbar className="header">
                        <IconButton color="inherit" aria-label="Menu" onClick={() => this.handleMenuToggle(true)}>
                            <MenuIcon />
                        </IconButton>

                        <Avatar alt="Logo HC Domynos Praha" src={logo} className="logo" />
                        <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
                            <Link to="/">HC Domynos</Link>
                        </Typography>
                        {
                            loggedUser ?
                                <span>Logged in as <u>{loggedUser.email}</u></span> :
                                <Button color="inherit"><Link to="/login">Login</Link></Button>
                        }
                    </Toolbar>
                </AppBar>
                <Menu open={menuOpen} onMenuToggle={(open) => this.handleMenuToggle(open)} />
            </>
        );
    }
}

const mapStateToProps = state => ({
    loggedUser : state.authReducer.firebaseUser
});

export default connect(mapStateToProps)(Header);