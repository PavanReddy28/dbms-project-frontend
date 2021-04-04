import React, { useEffect, useState } from "react";
import { axiosInstance } from "../axiosInstance";
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
// import { DeleteIcon } from "@material-ui/icons";
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import EditTourn from "./EditTourn";
import {DashboardRegistrations} from "./Registrations"


const useStyles = makeStyles((theme) => ({
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
        display: "block",
        marginLeft: "auto"
    },
    nested: {
        paddingLeft: theme.spacing(4)
    },
    sportNested: {
        paddingLeft: 2 * theme.spacing(4)
    },
    deleteButton: {
        color: "#ff3d00"
    }
}))

function Dashboard() {

    const classes = useStyles();
    const history = useHistory();

    const [tournaments, setTournaments] = useState([]);
    const [open, setOpen] = useState({
        main: null,
        sportList: null
    })

    const [registrations, setRegistrations] = useState({});


    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [dialogTourn, setDialogTourn] = useState(null);



    const matches = ["Goa vs Pilani", "Goa vs Hyd", "Goa vs Pilani", "Goa vs Hyd", "Goa vs Pilani", "Goa vs Hyd", "Goa vs Pilani", "Goa vs Hyd", "Goa vs Pilani", "Goa vs Hyd"];

    //GET request to get all tournaments from backend
    //GET request to get all PENDING registrations
    useEffect(() => {
        axiosInstance.get("/tournament", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        }).then(response => {
            setTournaments(response.data.tournaments);
        }).catch(err => console.log(err));

        axiosInstance.get("/team/PENDING", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }  
        }).then(response => {
            setRegistrations(response.data);
            console.log(Object.keys(response.data))
        });

    }, [])

    //collapsible tournament list
    function handleCollapse(id) {
        id !== open.main ? setOpen(prev => {
            return {
                ...prev,
                main: id
            }
        }) : setOpen(prev => {
            return {
                ...prev,
                main: null
            }
        });
    }

    function handleSportsCollapse(id) {
        id !== open.sportList ? setOpen(prev => {
            return {
                ...prev,
                sportList: id
            }
        }) : setOpen(prev => {
            return {
                ...prev,
                sportList: null
            }
        });
    }


    //edit and delete dialogues
    function activateDialog(tournament, type) {

        setDialogTourn(tournament);
        // setDialogOpen(true);
        type === "delete" ? setDeleteOpen(true) : setEditOpen(true);
    }

    // closing of dialogues
    function handleCancel(type) {
        setDialogTourn(null);
        type === "delete" ? setDeleteOpen(false) : setEditOpen(false);
    }

    // DELETE request to /tournament
    function handleDelete() {
        axiosInstance.delete("/tournament", {
            data: {
                "tournament_id": dialogTourn.tournament_id
            },
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        setTournaments(previous => {
            return previous.filter(tournament => {
                return tournament.tournament_id !== dialogTourn.tournament_id
            })
        });
        setDeleteOpen(false);
        setDialogTourn(null);
    }

    function handleEdit(tourn) {
        console.log(tourn);
        // axiosInstance.put("/tournament",{
        //     data: JSON.stringify(tourn),
        //     headers: {
        //         "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        //     }
        // }).catch(err => console.log(err));
        axiosInstance.put("/tournament", tourn, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        let tempTourn = tournaments.slice();
        tempTourn.forEach((tournament, index) => {
            if (tournament.tournament_id === tourn.tournament_id) {
                tempTourn[index] = tourn
            }
        });
        setTournaments(tempTourn);
        setEditOpen(false);
    }



    return (
        <>
            <Grid container spacing={2} className={classes.container}>

                <Grid item lg={6} sm={12}>
                    <Paper className={classes.paper} elevation={1}>
                        <Grid container>
                            <Grid item sm={6} lg={6}>
                                <Typography variant="h5" color="primary">Current Tournaments</Typography>
                            </Grid>
                            <Grid item sm={6} lg={6}>
                                <IconButton onClick={() => history.push("/createTourn")} className={classes.addIcon}>
                                    <AddIcon />
                                </IconButton>
                            </Grid>
                        </Grid>



                        <List className={classes.list}>


                            {tournaments.map(tournament => {
                                return (
                                    <>

                                        <ListItem button key={tournament.tournament_id} onClick={() => handleCollapse(tournament.tournament_id)}>
                                            <ListItemText primary={tournament.t_name} />
                                            <IconButton size="small" onClick={() => activateDialog(tournament, "edit")}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton size="small" color="secondary" onClick={() => activateDialog(tournament, "delete")}>
                                                <DeleteIcon />
                                            </IconButton>
                                            {open.main === tournament.tournament_id ? <ExpandLess /> : <ExpandMore />}
                                        </ListItem>
                                        <Divider />

                                        <Collapse in={open.main === tournament.tournament_id} timeout="auto">
                                            <List component="div" disablePadding>
                                                <ListItem>
                                                    <ListItemText primary={"Organizer: " + tournament.college} className={classes.nested} />
                                                </ListItem>

                                                <ListItem>
                                                    <ListItemText primary={"City: " + tournament.city} className={classes.nested} />
                                                </ListItem>

                                                <ListItem button onClick={() => handleSportsCollapse(tournament.tournament_id, "sportList")}>
                                                    <ListItemText primary={"Sports"} className={classes.nested} />
                                                    {open.sportList === tournament.tournament_id ? <ExpandLess /> : <ExpandMore />}
                                                </ListItem>
                                            </List>
                                            <Collapse in={open.sportList === tournament.tournament_id} timeout="auto">
                                                <List component="div" disablePadding>
                                                    {tournament.sports.map(sport => {
                                                        return (
                                                            <>
                                                                <ListItem key={sport}>
                                                                    <ListItemText primary={sport} className={classes.sportNested} />
                                                                </ListItem>

                                                            </>
                                                        )
                                                    })}
                                                </List>
                                            </Collapse>

                                        </Collapse>
                                    </>
                                )
                            })}
                        </List>
                    </Paper>
                </Grid>

                <Grid item lg={6} sm={12}>
                            <DashboardRegistrations classes = {classes.paper} registrations={registrations}/>
                </Grid>

                <Grid item lg={6} sm={12}>
                    <Paper className={classes.paper} elevation={1}>
                        <Typography variant="h5" color="primary">Current Matches</Typography>
                        <List className={classes.list}>


                            {matches.map(match => {
                                return <ListItem><ListItemText primary={match} /></ListItem>
                            })}
                        </List>
                    </Paper>
                </Grid>
            </Grid>
            <Dialog
                open={deleteOpen}
                onClose={() => setDeleteOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{dialogTourn !== null ? "Delete tournament '" + dialogTourn.t_name + "' ?" : ""}</DialogTitle>
                <Divider />
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        By pressing confirm this tournament will be permanently deleted
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDelete} color="primary" >
                        Confirm
          </Button>
                    <Button onClick={() => handleCancel("delete")} color="primary" autoFocus>
                        Cancel
          </Button>
                </DialogActions>
            </Dialog>
            <EditTourn tournament={dialogTourn} editOpen={editOpen} onClose={() => handleCancel("edit")} onEdit={handleEdit} />
        </>
    )
}

export default Dashboard;