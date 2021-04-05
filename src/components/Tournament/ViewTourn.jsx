import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../axiosInstance";
import { useParams, useHistory } from "react-router-dom";
import { Paper, List, ListItem, ListItemText, Grid, Collapse, makeStyles, Typography } from "@material-ui/core";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "30px",
    minHeight: "300px"
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
  const [sports, setSports] = useState([]);
  const [teams, setTeams] = useState([]);

  const [sortedTeams, setSortedTeams] = useState(null);

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

    }).catch(err => {
      err.response.status === 401 && history.push("/login");
    })


    // get sports
    axiosInstance.get(`/tournament/getSports/${tourn_id}`).then(
      response => {
        setSports(response.data.sports);
        let Sports = response.data.sports;

        console.log(Sports)


        //get teams
        axiosInstance.get(`/teams/${tourn_id}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
          }
        }).then(response => {
          setTeams(response.data.teams);
          let Teams = response.data.teams;

          let orgTeams = {}

          Sports.forEach(sport => {

            orgTeams[sport] = [];

            Teams.forEach(team => {
              if (sport === team.sportName) {
                orgTeams[sport].push(team);
              }
            })
          })

          console.log(orgTeams)

          setSortedTeams(orgTeams)



        }).catch(err => {
          err.response.status === 401 && history.push("/login");
        })



      }
    )

  }, [tourn_id, history])

  return (
    <Grid container className={classes.container} spacing={2}>
      <Grid item sm={12} lg={12}>
        {tournament && <TournDetails tournament={tournament} />}
      </Grid>

      {sortedTeams && Object.keys(sortedTeams).map(sport => {
        return (
          <Grid item sm={6}>

            <SportTeams teamData={sortedTeams[sport]} sport={sport} />

          </Grid>
        )
      })}
    </Grid>

  )
}

function SportTeams({ teamData, sport }) {

  const [open, setOpen] = useState(null);

  const classes = useStyles();

  function handleCollapse(id) {

    id !== open ? setOpen(id) : setOpen(null)
  }

  return (
    <Paper elevation={1} className = {classes.paper} >
      <Typography variant="h5" color="primary">{sport}</Typography>
      {teamData.length > 0 ? teamData.map(team => {
        return (
          <>
            <List>
              <ListItem button onClick={() => handleCollapse(team.team_id)} key={team.team_id}>
                <ListItemText primary={team.team_name} />
                {open === team.team_id ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
            </List>
            <Collapse in={open === team.team_id} timeout="auto">
              <List component="div" disablePadding>
                <ListItem key={team.team_id + team.college}>
                  <ListItemText primary={team.college} secondary={"College/Organizer"} className={classes.nested} />
                </ListItem>
                <ListItem key={team.team_id + team.num_players}>
                  <ListItemText primary={team.num_players} secondary={"Players"} className={classes.nested} />
                </ListItem>
                <ListItem key={team.team_id + team.captain_f_name}>
                  <ListItemText primary={`${team.captain_f_name} ${team.captain_l_name}`} secondary={"Captain"} className={classes.nested} />
                </ListItem>
                <ListItem key={team.team_id + team.contact}>
                  <ListItemText primary={team.contact} secondary={"Contact Number"} className={classes.nested} />
                </ListItem>
              </List>
            </Collapse>
          </>
        )
      }) : <Typography>No Teams Present</Typography>}
    </Paper>
  )
}

function TournDetails({ tournament }) {

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <Paper elevation={1} className={classes.paper}>
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
        <ListItem button onClick={() => setOpen(prev => !prev)}>
          <ListItemText primary={"Sports"} secondary={"Click to view"} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto">
          <List component="div" disablePadding>
            {tournament.sports.map(sport => {
              return (
                <ListItem>
                  <ListItemText primary={sport} className={classes.nested} />
                </ListItem>
              )
            })}
          </List>
        </Collapse>
      </List>
    </Paper>
  )
}

function TournTeams() {

  const [teams, setTeams] = useState([]);
  const history = useHistory();
  const classes = useStyles();

  const { tourn_id } = useParams();

  useEffect(() => {
    axiosInstance.get(`/teams/${tourn_id}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
      }
    }).then(response => {
      setTeams(response.data.teams)
    }).catch(err => {
      err.response.status === 401 && history.push("/login");
    })
  }, [history, tourn_id])

  return (
    <Paper elevation={1} className={classes.paper} >
      <Typography variant="h5" color="primary">Teams</Typography>
      <List>
        {teams.map(team => {
          return (
            <ListItem>
              <ListItemText primary={team.team_name} />
            </ListItem>
          )
        })}

      </List>
    </Paper>
  )
}

export default ViewTourn;