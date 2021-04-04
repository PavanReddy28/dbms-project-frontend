import React, { useEffect, useState } from "react";
import { Typography, Paper, makeStyles, List, ListItem, ListItemText, Divider, Button, Grid, IconButton, Collapse } from "@material-ui/core";
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { useHistory } from "react-router-dom";
import { axiosInstance } from "../axiosInstance";


const RegistrationStyles = makeStyles((theme) => ({
    container: {
        margin: "10px 0"
    },
    paper: {
        padding: "1rem"
    },
    checkIcon: {
        color: "#00e676"
    },
    nested: {
        paddingLeft: theme.spacing(4)
    }
}))

function Registrations() {

    const classes = RegistrationStyles();

    const [pending, setPending] = useState({});
    const [rejected, setRejected] = useState({});
    const [registered, setRegistered] = useState({});

    const [open, setOpen] = useState({
        pending: null,
        sportList: null
    })

    useEffect(() => {
        axiosInstance.get("/team/PENDING", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        }).then(response => {
            setPending(response.data);
        })

        axiosInstance.get("/team/REJECTED", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        }).then(response => {
            setRejected(response.data);
        })

        axiosInstance.get("/team/REGISTERED", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        }).then(response => {
            setRegistered(response.data);
        })
    }, [])

    function handleCollapse(id, type) {
        id !== open[type] ? setOpen(prev => {
            return {
                ...prev,
                [type]:id
            }
        }) : setOpen(prev => {
            return {
                ...prev,
                [type]: null
            }
        })
    }

    return (
        <Grid container spacing={1} className={classes.container}>

            <Grid item sm={12}>
                <Paper elevation={1} className={classes.paper}>
                    <Typography variant="h5" color="primary">Pending Registrations</Typography>
                    <List>
                        {Object.keys(pending).map(tournament => {

                            {/* return (
                                pending[tournament].map(reg => {
                                    return (
                                        <>
                                            <ListItem key={reg.team_id}>
                                                <ListItemText primary={reg.team_name} secondary={tournament} />
                                                <IconButton size="small" className = {classes.checkIcon}>
                                                    <CheckIcon />
                                                </IconButton>
                                                <IconButton size="small" color="secondary">
                                                    <ClearIcon />
                                                </IconButton>
                                            </ListItem>
                                            <Divider />
                                        </>

                                    )
                                })
                            ) */}

                            return (
                                <>
                                    <ListItem button key={tournament} onClick={() => handleCollapse(tournament,"pending")}>
                                        <ListItemText primary={tournament} />
                                        {open.pending === tournament ? <ExpandLess /> : <ExpandMore />}
                                    </ListItem>
                                    <Collapse in={open.pending === tournament} timeout="auto">
                                        <List component="div" disablePadding>
                                            {pending[tournament].map(reg => {
                                                return (
                                                    <>
                                                        <ListItem key={reg.team_id}>
                                                            <ListItemText primary={reg.team_name} secondary={tournament} className={classes.nested}/>
                                                            <IconButton size="small" className={classes.checkIcon}>
                                                                <CheckIcon />
                                                            </IconButton>
                                                            <IconButton size="small" color="secondary">
                                                                <ClearIcon />
                                                            </IconButton>
                                                        </ListItem>
                                                        <Divider />
                                                    </>
                                                )
                                            })}
                                        </List>
                                    </Collapse>
                                </>
                            )

                        })}
                    </List>
                </Paper>

            </Grid>

            <Grid item sm={12}>

            </Grid>

            <Grid item sm={12}>

            </Grid>


        </Grid>
    )
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

// handle case when no registrations found
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
                    <Button color="primary" onClick={() => history.replace("/registrations")} className={classes.button}>edit registrations</Button>
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