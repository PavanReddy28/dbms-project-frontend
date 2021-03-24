import React from "react";
import { Container, Typography, makeStyles } from '@material-ui/core';


const useStyles = makeStyles({
    footer: {
        marginTop: "auto",
        position: "fixed",
        bottom: "0",
        zIndex: 1,
        backgroundColor: "#3f51b5",
        color: "#ffff",
        width: "100%",
        textAlign: "center"
    },
    footerText: {
        padding: "5px 0px"
    }
})


function Footer() {

    const classes = useStyles()

    return (
        <footer className={classes.footer}>

            <Container maxWidth="xl" className = {classes.footerText}>
                <Typography variant="body1">Copyright © App Name {new Date().getFullYear()}</Typography>
            </Container>
        </footer>

    )
}

export default Footer