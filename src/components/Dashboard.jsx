import React, { useEffect, useState } from "react";
import { axiosInstance } from "../axiosInstance"
import { 
    Grid,
    Container, 
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
    DialogContent 
} from '@material-ui/core';
// import { DeleteIcon } from "@material-ui/icons";
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { SkipPrevious } from "@material-ui/icons";


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
        color: "green",
        backgroundColor: "blue"
    },
    nested: {
        paddingLeft: theme.spacing(4)
    }
}))

function Dashboard() {

    const classes = useStyles();
    const [tournaments, setTournaments] = useState([]);
    const [open, setOpen] = useState(null)
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogTourn, setDialogTourn] = useState(null);
    const matches = ["Goa vs Pilani", "Goa vs Hyd", "Goa vs Pilani", "Goa vs Hyd", "Goa vs Pilani", "Goa vs Hyd", "Goa vs Pilani", "Goa vs Hyd", "Goa vs Pilani", "Goa vs Hyd"];

    useEffect(() => {
        axiosInstance.get("/tournament", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        }).then(response => {
            setTournaments(response.data.tournaments);
        }).catch(err => console.log(err));
    }, [])

    // axiosInstance.get("/tournament",{
    //             headers: {
    //                 "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
    //             }
    //         }).then(response => setTournaments(response.data.tournaments))
    //         .catch(err => console.log(err))

    function handleClick(id) {
        id !== open?setOpen(id) : setOpen(null);
    }

    function handleConfirm(tournament) {
        // setTournaments(previous => {
        //     return previous.filter(item => {
        //         return item.tournament_id !== id
        //     })
        // })
        setDialogTourn(tournament);
        setDialogOpen(true);
    }

    function HandleDelete() {
        axiosInstance.delete("/tournament", {
            data:{
                "tournament_id":dialogTourn.tournament_id
            },
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        setTournaments(previous => {
            return previous.filter( tournament => {
                return tournament.tournament_id !== dialogTourn.tournament_id
            })
        });
        setDialogOpen(false);
        setDialogTourn(null);
    }

    function handleCancel() {
        setDialogTourn(null);
        setDialogOpen(false);
    }

    return (
        <>
        <Grid container spacing={2} className={classes.container}>

            <Grid item lg={6} sm={12}>
                <Paper className={classes.paper} elevation={1}>
                    <Typography variant="h5" color="primary">Current Tournaments</Typography>
                    <IconButton>
                        <AddIcon />
                    </IconButton>

                    <List className={classes.list}>


                        {tournaments.map(tournament => {
                            return (
                                <>
                                <ListItem button key={tournament.tournament_id} onClick = {() => handleClick(tournament.tournament_id)}>
                                    <ListItemText primary={tournament.t_name} />
                                    <IconButton size="small">
                                        <EditIcon /> 
                                    </IconButton>
                                    <IconButton size="small">
                                        <DeleteIcon onClick = {() => handleConfirm(tournament)}/>
                                    </IconButton>
                                    {open === tournament.tournament_id ? <ExpandLess /> : <ExpandMore />}
                                </ListItem>
                                
                                <Collapse in={open === tournament.tournament_id} timeout="auto" unMountOnExit>
                                    <List component="div" disablePadding>
                                        <ListItem>
                                            <ListItemText primary={"Organizer: " + tournament.college} className={classes.nested}/>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary={"City: " + tournament.city} className={classes.nested}/>
                                        </ListItem>
                                    </List>

                                </Collapse>
                                </>
                            )
                        })}
                    </List>
                </Paper>
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
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{dialogTourn !== null?"Delete tournament '" + dialogTourn.t_name + "' ?":""}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            By pressing confirm this tournament will be permanently deleted
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={HandleDelete} color="secondary" >
            Confirm
          </Button>
          <Button onClick={handleCancel} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
        </>
    )
}

export default Dashboard;