import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../axiosInstance";
import { useParams, useHistory } from "react-router-dom";
import { Paper, List, ListItem, ListItemText, Grid, Collapse, makeStyles, Typography } from "@material-ui/core";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  paper: {
      padding: "30px",
  },
  container: {
      margin: "10px 0px"
  },
  nested: {
      paddingLeft: theme.spacing(4)
  }
}))

function ViewTourn() {

  const { tourn_id } = useParams();
  const classes = useStyles();
  const history = useHistory();

  const [tournament, setTournament] = useState(null);

  useEffect(() => {

    axiosInstance.get("/tournament", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
      }
    }).then(response => {

      console.log(response.data)

      const [tourn] = response.data.tournaments.filter(tournament => {
        return tournament.tournament_id === parseInt(tourn_id)
      });

      setTournament(tourn);

    }).catch( err => {
      err.response.status === 401 && history.push("/login")
    })
  }, [tourn_id])

  return (
    <Grid container className={classes.container} spacing={2}>
      <Grid item sm={6} lg={6}>
        {tournament && <TournDetails tournament={tournament}/>}
      </Grid>
    </Grid>

  )
}

function TournDetails({tournament}) {

  const classes = useStyles();
  const [open,setOpen] = useState(false);

    return (
      <Paper elevation={1} className = {classes.paper}>
          <Typography variant="h5" color="primary">Tournament details</Typography>
          <List>
            <ListItem>
              <ListItemText primary={tournament.t_name} secondary={"Name"} />
            </ListItem>
            <ListItem>
              <ListItemText primary={tournament.college} secondary={"College/Organizer"} />
            </ListItem>
            <ListItem>
              <ListItemText primary={tournament.city} secondary={"City"} />
            </ListItem>
            <ListItem>
              <ListItemText primary={tournament.country} secondary={"Country"} />
            </ListItem>
            <ListItem button onClick = {() => setOpen(prev => !prev)}>
              <ListItemText primary={"Sports"} secondary={"Click to view"} />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto">
                <List component="div" disablePadding>
                    {tournament.sports.map(sport => {
                      return (
                        <ListItem>
                          <ListItemText primary={sport} className={classes.nested}/>
                        </ListItem>
                      )
                    })}
                </List>
            </Collapse>
          </List>
        </Paper>
    )
}

export default ViewTourn;