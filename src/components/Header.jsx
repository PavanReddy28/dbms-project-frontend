import React from "react";
import { AppBar, Toolbar, Box, Button, makeStyles, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
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
    }
});



function Header() {

    const classes = useStyles();

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
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                    App name
                    </Typography>
                    <Box className={classes.nav}>
                        {links.map(link => {
                            return (
                                <Link to={link.path} className={classes.link}>
                                    <Button color="inherit" className={classes.navLink}>{link.name}</Button>
                                </Link>
                            )
                        })}
                    </Box>
                </Toolbar>



            </AppBar>
        </div>

    )
}

export default Header;


