import React from "react";
import { Typography, Paper, makeStyles, List, ListItem, ListItemText, Divider, Button, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";

function Registrations() {
    return <Typography>Registrations</Typography>
}

const DashStyles = makeStyles((theme) => ({
    paper: {
        padding: "30px",
    },
    button: {
        display: "block",
        marginLeft: "auto"
    }
}))

function DashboardRegistrations(props) {

    const classes = DashStyles();
    const history = useHistory();

    return (
        <Paper elevation={1} className={classes.paper}>

            <Grid container >
                <Grid item sm={6} lg={6}>
                    <Typography variant="h5" color="primary">Pending Registrations</Typography>
                </Grid>
                <Grid item sm={6} lg={6}>
                    <Button color="primary" onClick={() => history.replace("/registrations")} className = {classes.button}>edit registrations</Button>
                </Grid>
            </Grid>


            <List>
                {Object.keys(props.registrations).map(tournament => {

                    return (
                        props.registrations[tournament].map(reg => {
                            return (
                                <>
                                    <ListItem key={reg.team_id}>
                                        <ListItemText primary={reg.team_name} secondary={tournament} />
                                    </ListItem>
                                    <Divider />
                                </>

                            )
                        })
                    )

                })}
            </List>


        </Paper>
    )


}

export default Registrations;
export { DashboardRegistrations };