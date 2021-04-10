import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../axiosInstance";
import Loading from "../../Private/Loading";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Paper, List, ListItem, ListItemText, Collapse, makeStyles, Typography, IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(4),
        padding: theme.spacing(3)
    },
    nested: {
      paddingLeft: theme.spacing(4)
    }
  }))

function ViewTeam() {


    const { team_id } = useParams();
    const classes = useStyles();
    const [team, setTeam] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {

        axiosInstance.get(`/team/${team_id}`).then(response => setTeam(response.data))
            .catch(err => console.log(err))

    }, [team_id])

    if (team) {
        return (
            <Paper elevation={1} className={classes.paper}>
            <Typography variant="h5" color="primary">Team Details</Typography>
                <List>
                    <ListItem>
                        <ListItemText primary={team.team_name} secondary={"Team name"} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={team.sportName} secondary={"Sport"} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={team.college} secondary={"College/Organizer"} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={team.contact} secondary={"Contact"} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={"Players"} secondary={"Click to view"} />
                        <IconButton onClick = {() => setOpen(prev => !prev)}>
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                        
                    </ListItem>
                    <Collapse in={open}>
                        <List component="div" disablePadding>
                            {team.players.map(player => {

                                return (
                                    <>
                                        <ListItem>
                                            <ListItemText primary={player.firstname} secondary={"First Name"} className={classes.nested}/>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary={player.lastname} secondary={"Last Name"} className={classes.nested}/>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary={player.age} secondary={"Age"} className={classes.nested}/>
                                        </ListItem>
                                    </>
                                )
                            })}
                        </List>
                    </Collapse>


                </List>
            </Paper>
        )
    } else {
        return <Loading />
    }

}

export default ViewTeam;