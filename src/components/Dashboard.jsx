import React, { useEffect, useState } from "react";
import { axiosInstance } from "../axiosInstance"
import { Grid, Container, Typography, makeStyles, Paper, List, ListItem, ListItemText, Button, IconButton } from '@material-ui/core';
// import { DeleteIcon } from "@material-ui/icons";
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(() => ({
    paper: {
        padding: "30px",
    },
    container: {
        margin: "10px"
    },
    list: {
        maxHeight: "300px",
        overflow: "auto"
    },
    addIcon: {
        color: "green",
        backgroundColor: "blue"
    }
}))

function Dashboard() {

    const classes = useStyles();
    const [tournaments, setTournaments] = useState([]);
    const matches = ["Goa vs Pilani", "Goa vs Hyd", "Goa vs Pilani", "Goa vs Hyd", "Goa vs Pilani", "Goa vs Hyd", "Goa vs Pilani", "Goa vs Hyd", "Goa vs Pilani", "Goa vs Hyd"];

    useEffect(() => {
        axiosInstance.get("/tournament", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        }).then(response => {
            setTournaments(response.data.tournaments);
            // console.log(response.data.tournaments)
        });
    }, [])

    // axiosInstance.get("/tournament",{
    //             headers: {
    //                 "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
    //             }
    //         }).then(response => setTournaments(response.data.tournaments))
    //         .catch(err => console.log(err))

    return (
        <Grid container spacing={2} className={classes.container}>

            <Grid item lg={6} sm={12}>
                <Paper className={classes.paper}>
                    <Typography variant="h5" color="primary">Current Tournaments</Typography>
                    <IconButton>
                        <AddIcon />
                    </IconButton>

                    <List className={classes.list}>


                        {tournaments.map(tournament => {
                            return (
                                <ListItem key={tournament.tournament_id}>
                                    <ListItemText primary={tournament.t_name} />
                                    <IconButton size="small">
                                        <EditIcon /> 
                                    </IconButton>
                                    <IconButton size="small">
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItem>
                            )
                        })}
                    </List>
                </Paper>
            </Grid>

            <Grid item lg={6} sm={12}>
                <Paper className={classes.paper}>
                    <Typography variant="h5" color="primary">Current Matches</Typography>
                    <List className={classes.list}>


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