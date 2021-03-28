import React from "react";
import { Grid, Container, Typography, makeStyles, Paper, List, ListItem, ListItemText } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    paper: {
        padding: "30px",
    },
    container: {
        margin: "10px"
    },
    list: {
        maxHeight: "300px",
        overflow:"auto"
    }
}))

function Dashboard() {

    const classes = useStyles();
    const tournaments = ["ARENA", "BLITZKRIEG", "BOSM", "ARENA", "BLITZKRIEG", "BOSM", "ARENA", "BLITZKRIEG", "BOSM", "ARENA", "BLITZKRIEG", "BOSM"];
    const matches = ["Goa vs Pilani", "Goa vs Hyd", "Goa vs Pilani", "Goa vs Hyd", "Goa vs Pilani", "Goa vs Hyd", "Goa vs Pilani", "Goa vs Hyd", "Goa vs Pilani", "Goa vs Hyd"];


    return (
        <Grid container spacing = {2} className = {classes.container}>

            <Grid item lg={6} sm={12}>
                <Paper className={classes.paper}>
                    <Typography variant="h5" color="primary">Current Tournaments</Typography>
                    <List className = {classes.list}>

                    
                    {tournaments.map(tournament => {
                        return <ListItem><ListItemText primary={tournament} /></ListItem>
                    })}
                    </List>
                </Paper>
            </Grid>

            <Grid item lg={6} sm={12}>
                <Paper className={classes.paper}>
                    <Typography variant="h5" color="primary">Current Matches</Typography>
                    <List className = {classes.list}>

                    
                    {matches.map(match => {
                        return <ListItem><ListItemText primary={match} /></ListItem>
                    })}
                    </List>
                </Paper>
            </Grid>




        </Grid>
    )
}

export default Dashboard;