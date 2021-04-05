import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../axiosInstance";
import { useHistory } from "react-router-dom";
import {
    Grid,
    Typography,
    makeStyles,
    Paper,
    List,
    ListItem,
    ListItemText,
    Button,
    IconButton,
    Collapse,
    Dialog,
    DialogActions,
    DialogContentText,
    DialogTitle,
    DialogContent,
    Divider
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: "30px"
    }
}))

function TournList() {

    const [tournaments, setTournaments] = useState(null);

    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        axiosInstance.get("/tournamentList").then(response => {
            setTournaments(response.data.tournaments)
        })
    })

    return (
        <Paper elevation ={1} className={classes.paper}>
            <Typography variant ="h5" color="primary">Current Tournaments</Typography>
            <List>
                {tournaments && tournaments.map(tournament => {
                    return (
                        <ListItem key={tournament.tournament_id} button onClick={() => history.push(`/viewTourn/${tournament.tournament_id}`)}>
                            <ListItemText primary={tournament.t_name} secondary={tournament.college} />
                        </ListItem>
                    )
                })}
            </List>
            
        </Paper>

    )
}

export default TournList