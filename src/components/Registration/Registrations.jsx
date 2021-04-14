import React, { useEffect, useState } from "react";
import { Typography, Paper, makeStyles, List, ListItem, ListItemText, Divider, Button, Grid, IconButton, Collapse, Dialog, DialogContent, DialogContentText, DialogActions, DialogTitle } from "@material-ui/core";
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { useHistory } from "react-router-dom";
import { axiosInstance } from "../../axiosInstance";


const RegistrationStyles = makeStyles((theme) => ({
    container: {
        margin: "10px 0"
    },
    paper: {
        padding: theme.spacing(4)
    },
    checkIcon: {
        color: "#00e676"
    },
    nested: {
        paddingLeft: theme.spacing(4)
    },
    innerNested: {
        paddingLeft: theme.spacing(8)
    }
}))

function RegistrationList({ data, title, type }) {

    const classes = RegistrationStyles()
    const history = useHistory();

    const [open, setOpen] = useState({
        tourn: null,
        reg: null
    });

    const [dialogReg, setDialogReg] = useState(null);
    const [registerDialog, setRegisterDialog] = useState(false);
    const [rejectDialog, setRejectDialog] = useState(false);

    function handleCollapse(id, type) {
        id !== open[type] ? setOpen(prev => {
            return {
                ...prev,
                [type]: id
            }
        }) : setOpen(prev => {
            return {
                ...prev,
                [type]: null
            }
        })
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
            window.location.reload();
        }).catch(err => {
            if(err.response.status && err.response.status === 400){
                history.push("/login");
            }
        });;
    }

    return (
        <>
            <Dialog open={registerDialog} onClose={() => setRegisterDialog(false)}>
                <DialogTitle>Register the team?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        By pressing confirm, '{dialogReg && dialogReg.team_name}' will be marked as 'registered'
                    </DialogContentText>
                </DialogContent>
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
                <DialogTitle>Reject the team?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        By pressing confirm, '{dialogReg && dialogReg.team_name}' will be marked as 'rejected'
                    </DialogContentText>
                </DialogContent>
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
                    {Object.keys(data).length !== 0 ? Object.keys(data).map((tournament,idx) => {


                        return (
                            <>
                                <ListItem key={tournament + type}>
                                    <ListItemText primary={tournament} />
                                    <IconButton onClick={() => handleCollapse(tournament, "tourn")}>
                                        {open.tourn === tournament ? <ExpandLess /> : <ExpandMore />}
                                    </IconButton>
                                </ListItem>
                                <Collapse in={open.tourn === tournament} timeout="auto">
                                    <List component="div" disablePadding>
                                        {data[tournament].map(reg => {
                                            return (
                                                <>
                                                    <ListItem key={reg.team_id} button onClick={() => handleCollapse(reg.team_id,"reg")}>
                                                        <ListItemText primary={reg.team_name} secondary={tournament} className={classes.nested} />
                                                        {open.reg === reg.team_id ? <ExpandLess /> : <ExpandMore />}
                                                        {(type === "pending" || type === "rejected") && (
                                                            <IconButton size="small" className={classes.checkIcon} onClick={() => {
                                                                setDialogReg(reg);
                                                                setRegisterDialog(true);

                                                            }}>
                                                                <CheckIcon />
                                                            </IconButton>)}
                                                        {(type !== "rejected") && (
                                                            <IconButton size="small" color="secondary" onClick={() => {
                                                                setDialogReg(reg);
                                                                setRejectDialog(true);

                                                            }}>
                                                                <ClearIcon />
                                                            </IconButton>
                                                        )}

                                                    </ListItem>
                                                    <Divider />
                                                    <Collapse in={open.reg === reg.team_id}>
                                                        <List component="div" disablePadding>
                                                        <ListItem key = {`${reg.team_id}-${reg.college}`}>
                                                                    <ListItemText primary={reg.college} secondary={"College/Organizer"} className={classes.innerNested} />              
                                                        </ListItem>
                                                        <ListItem key = {`${reg.team_id}-${reg.num_players}`}>
                                                                    <ListItemText primary={reg.num_players} secondary={"Players"} className={classes.innerNested} />
                                                        </ListItem>
                                                        <ListItem key = {`${reg.team_id}-${reg.captain_f_name}`}>
                                                                    <ListItemText primary={`${reg.captain_f_name} ${reg.captain_l_name}`} secondary={"Captain"} className={classes.innerNested} />
                                                        </ListItem>
                                                        <ListItem key = {`${reg.team_id}-${reg.sport}`}>
                                                                    <ListItemText primary={reg.sport} secondary={"Sport"} className={classes.innerNested} />
                                                        </ListItem>
                                                        <ListItem key = {`${reg.team_id}-${reg.contact}`}>
                                                                    <ListItemText primary={reg.contact} secondary={"Contact Number"} className={classes.innerNested} />
                                                        </ListItem>
                                                        </List>
                                                    </Collapse>
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
    const history = useHistory();

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
        }).catch(err => {
            if(err.response.status && err.response.status === 400){
                history.push("/login");
            }
        });

        axiosInstance.get("/team/REJECTED", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        }).then(response => {
            setRejected(response.data);
        }).catch(err => {
            if(err.response.status && err.response.status === 400){
                history.push("/login");
            }
        });

        axiosInstance.get("/team/REGISTERED", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        }).then(response => {
            setRegistered(response.data);
        }).catch(err => {
            if(err.response.status && err.response.status === 400){
                history.push("/login");
            }
        });
    }, [history])



    return (
        <Grid container spacing={1} className={classes.container}>

            <Grid item sm={12}>
                <RegistrationList data={pending} title="Pending Registrations" type="pending" />
            </Grid>

            <Grid item sm={12}>
                <RegistrationList data={registered} title="Registered Teams" type="registered" />
            </Grid>

            <Grid item sm={12}>
                <RegistrationList data={rejected} title="Rejected Teams" type="rejected" />
            </Grid>


        </Grid>
    )
}

const DashStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(4),
        overflow: "auto",
        minHeight: 600,
        maxHeight: 600,    
    },
    button: {
        display: "block",
        marginLeft: "auto"
    },
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


            <List className={classes.list}>
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