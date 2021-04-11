import React, { useState } from "react";
import { AppBar, Toolbar, Box, Hidden, Button, makeStyles, IconButton, List, ListItem, ListItemText, Drawer, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Menu } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { axiosInstance } from "../../axiosInstance";
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';

const useStyles = makeStyles((theme) => ({
    '@global': {
        '*::-webkit-scrollbar': {
            width: '0.2em'
        },
        '*::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0)'
        },
        '*::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.primary.main,
            outline: '1px solid slategrey'
        }

    },

    nav: {
        marginLeft: "auto"
    },
    navLink: {
        color: "#ffff",
        textDecoration: "none",
        textTransform: "uppercase"
    },
    link: {
        textDecoration: "none"
    },
    list: {
        width: 250

    },
    listItem: {
        textDecoration: "none",
        color: theme.palette.text.primary
    },
    logout: {
        boxShadow: 'none',
        color: "#ffffff",
        // border: 'none',
        border: "1px solid rgba(255, 255, 255, 0.4)",

        '&:hover': {
            backgroundColor: '#ffffff',
            color: theme.palette.primary.main,
            boxShadow: 'none',
        },
        '&:active': {
            backgroundColor: '#ffffff',
            color: theme.palette.primary.main,
            boxShadow: 'none',
        },
        '&:focus': {
            backgroundColor: '#ffffff',
            color: theme.palette.primary.main,
            boxShadow: 'none',
        },
    }
}))


function Header(props) {

    const history = useHistory();
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        {
            path: "/",
            name: "Home"
        },
        {
            path: "/dashboard",
            name: "Dashboard"
        },
        {
            path: "/login",
            name: "Login"
        },
        {
            path: "/register",
            name: "Register"
        }

    ]

    function Logout() {
        axiosInstance.post("/logout", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        }).then(response => {
            history.push("/");
        }).catch(err => {
            history.push("/");
        })
    }

    return (
        <div className={classes.root}>
            <AppBar position="sticky">
                <Toolbar>
                    <Typography variant="h6">
                        App name
                    </Typography>
                    <Hidden only={["xs", "sm"]}>
                        <Box className={classes.nav}>

                            <IconButton onClick={props.toggle} style={{ color: "white" }}>
                                {props.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}

                            </IconButton>

                            {links.map(link => {
                                return (
                                    <Link to={link.path} className={classes.link}>
                                        <Button color="inherit" className={classes.navLink}>{link.name}</Button>
                                    </Link>
                                )
                            })}
                            <Button variant="outlined" className={classes.logout} onClick={Logout}>Log Out</Button>
                        </Box>
                    </Hidden>
                    <Hidden only={["md", "lg", "xl"]}>
                        <IconButton
                            onClick={() => setIsOpen(true)}
                            color="inherit"
                            className={classes.nav}
                        >
                            <Menu />
                        </IconButton>
                    </Hidden>

                </Toolbar>
            </AppBar>
            <Drawer anchor="right" open={isOpen} onClose={() => setIsOpen(false)}>
                <List className={classes.list}>
                    {links.map(link => {
                        return (
                            <Link to={link.path} className={classes.link}>
                                <ListItem button >
                                    <ListItemText primary={link.name} className={classes.listItem} />
                                </ListItem>
                            </Link>

                        )
                    })}
                    {/* need to fix style */}
                    <ListItem button>
                        <ListItemText primary={"Logout"} className={classes.listItem} />
                    </ListItem>
                </List>
            </Drawer>
        </div>

    )
}

export default Header;


