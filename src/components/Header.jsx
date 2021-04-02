import React, { useState } from "react";
import { AppBar, Toolbar, Box, Hidden, Button, makeStyles, IconButton, List, ListItem, ListItemText, Drawer, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Menu } from "@material-ui/icons";
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';

// const useStyles = makeStyles(theme => ({
//     nav: {
//         marginLeft: "auto"
//     },
//     navLink: {
//         color: theme.text.primary,
//         textDecoration: "none",
//         textTransform: "uppercase"
//     },
//     link: {
//         textDecoration: "none"
//     },
//     list: {
//         width: "250px"
        
//     },
//     listItem: {
        
//     }
// }));

const useStyles = makeStyles((theme) => ({
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
        width: "250px"
        
    },
    listItem: {
        textDecoration: "none",
        color: theme.palette.text.primary
    }
}))


function Header(props) {

    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        {
            path: "/",
            name: "Home"
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

    return (
        <>
        <AppBar position="sticky">
            <Toolbar>
                <Typography variant="h6">
                    App name
                    </Typography>
                <Hidden only={["xs", "sm"]}>
                    <Box className={classes.nav}>

                    <IconButton onClick={props.toggle} style={{color: "white"}}>
                        {props.mode === "dark"?<Brightness7Icon />:<Brightness4Icon />}
                        
                    </IconButton>
                        
                        {links.map(link => {
                            return (
                                <Link to={link.path} className={classes.link}>
                                    <Button color="inherit" className={classes.navLink}>{link.name}</Button>
                                </Link>
                            )
                        })}
                    </Box>
                </Hidden>
                <Hidden only={["md","lg","xl"]}>
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
                <List className = {classes.list}>
                    {links.map(link => {
                        return (
                            <Link to={link.path} className={classes.link}>
                            <ListItem button >
                                <ListItemText primary={link.name} className={classes.listItem}/>
                            </ListItem>
                            </Link>
                            
                        )
                    })}
                </List>
        </Drawer>
        </>

    )
}

export default Header;


