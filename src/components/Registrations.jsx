import React, { useEffect, useState } from "react";
import { Typography, Paper, makeStyles, List, ListItem, ListItemText, Divider, Button, Grid, IconButton, Collapse, Dialog, DialogContent, DialogContentText, DialogActions } from "@material-ui/core";
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

function RegistrationList({ data, title }) {

    const classes = RegistrationStyles()

    const [open, setOpen] = useState(null);

    const [dialogReg, setDialogReg] = useState(null);
    const [registerDialog, setRegisterDialog] = useState(false);
    const [rejectDialog, setRejectDialog] = useState(false);

    function handleCollapse(id, type) {
        id !== open ? setOpen(id) : setOpen(null)
    }

    function setStatus(status) {
        console.log(dialogReg);
        axiosInstance.put("/team", {
            tournament_id: dialogReg.tournament_id,
            team_id: dialogReg.team_id,
            status_update_to: status
        }, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            } 
        }).then(response => {
            setDialogReg(null);
            window.location.reload(false);
        });
    }

    return (
        <>
            <Dialog open={registerDialog} onClose={() => setRegisterDialog(false)}>
                <DialogContentText>Register the team?</DialogContentText>
                <DialogActions>
                    <Button onClick={() => setStatus("REGISTERED")} color="primary" >
                        Confirm
                    </Button>
                    <Button onClick={() => setRegisterDialog(false)} color="primary" autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={rejectDialog} onClose={() => setRejectDialog(false)}>
            <DialogContentText>Reject the team?</DialogContentText>
                <DialogActions>
                    <Button onClick={() => setStatus("REJECTED")} color="primary" >
                        Confirm
                    </Button>
                    <Button onClick={() => setRejectDialog(false)} color="primary" autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            <Paper elevation={1} className={classes.paper}>
                <Typography variant="h5" color="primary">{title}</Typography>
                <List>
                    {Object.keys(data).length !== 0 ? Object.keys(data).map(tournament => {


                        return (
                            <>
                                <ListItem button key={tournament} onClick={() => handleCollapse(tournament, "pending")}>
                                    <ListItemText primary={tournament} />
                                    {open === tournament ? <ExpandLess /> : <ExpandMore />}
                                </ListItem>
                                <Collapse in={open === tournament} timeout="auto">
                                    <List component="div" disablePadding>
                                        {data[tournament].map(reg => {
                                            return (
                                                <>
                                                    <ListItem key={reg.team_id}>
                                                        <ListItemText primary={reg.team_name} secondary={tournament} className={classes.nested} />
                                                        <IconButton size="small" className={classes.checkIcon} onClick={() => {
                                                            setDialogReg(reg);
                                                            setRegisterDialog(true);
                                                            
                                                            }}>
                                                            <CheckIcon />
                                                        </IconButton>
                                                        <IconButton size="small" color="secondary" onClick={() => {
                                                            setDialogReg(reg);
                                                            setRejectDialog(true);
                                                            
                                                            }}>
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

                    }) : <Typography>No registrations</Typography>}
                </List>
            </Paper>
        </>
    )
}

function Registrations() {

    const classes = RegistrationStyles();

    const [pending, setPending] = useState({});
    const [rejected, setRejected] = useState({});
    const [registered, setRegistered] = useState({});

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



    return (
        <Grid container spacing={1} className={classes.container}>

            <Grid item sm={12}>
                <RegistrationList data={pending} title="Pending Registrations" />
            </Grid>

            <Grid item sm={12}>
                <RegistrationList data={registered} title="Registered Teams" />
            </Grid>

            <Grid item sm={12}>
                <RegistrationList data={rejected} title="Rejected Teams" />
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