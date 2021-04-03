import React from "react";
import { Typography, Paper, makeStyles, List, ListItem, ListItemText, Divider } from "@material-ui/core";

function Registrations() {
    return <Typography>Registrations</Typography>
}

const DashStyles = makeStyles((theme) => ({
    paper: {
        padding: "30px",
    }
}))

function DashboardRegistrations(props) {

    const classes = DashStyles()

    return (
        <Paper elevation={1} className={classes.paper}>
            <Typography variant="h5" color="primary">Pending Registrations</Typography>

            <List>
                {Object.keys(props.registrations).map(tournament => {

                    return (
                        props.registrations[tournament].map(reg => {
                            return (
                                <>
                                <ListItem key={reg.team_id}>
                                <ListItemText primary={reg.team_name} secondary={tournament}/>
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