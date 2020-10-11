import React, { useEffect, useState} from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import {isAuthenticated, signout} from "../../../auth";
import {signOutUser} from "../../../actions/userActions";
import {useDispatch} from "react-redux";

// Spitboss Logo
import SpitbossLogo from '../../../assets/images/spitboss.svg'

// Material imports
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const Header = ({ title, description, history }) => {

    // Styles/Theme
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        logo: {
            width: '180px',
            position: 'absolute',
            right: '10px',
            top: '10px'
        },
        appBar: {
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }));
    const classes = useStyles();


    // Ready dispatch
    const dispatch = useDispatch();

    // Load
    const init = () => {

    };

    useEffect(() => {
        init();
    }, []);

    // Handle redirect on successful login
    const redirectUser = () => {
        if (!isAuthenticated()){
            return <Redirect to="/" />;
        }
    };

    return(
        <header>
            <div className={classes.root}>
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar variant="dense">
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {title}
                        </Typography>
                        <Button color="inherit" onClick={e => signout(() => {
                            dispatch(signOutUser());
                            history.push('/signin');
                        })}>Signout</Button>
                    </Toolbar>
                </AppBar>
            </div>
        </header>
    )
};

export default withRouter(Header);
