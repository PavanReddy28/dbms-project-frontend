import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../axiosInstance";
import { useParams, useHistory } from "react-router-dom";
import { Paper, List, ListItem, ListItemText, Grid, Collapse, makeStyles, Typography } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Loading from "../../Private/Loading"

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "30px",
    marginTop: "20px",
    minHeight: "20rem",
    backgroundColor: "#303030"
  },
  wrapPaper: {
    padding: "30px",
    minHeight: "20rem",
    backgroundColor: "#474747"
  },
  container: {
    margin: "2% 0px",
    maxWidth: "100%"
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

  const [sortedTeams, setSortedTeams] = useState(null);

  const [sortedMatches, setSortedMatches] = useState(null);

  useEffect(() => {

    axiosInstance.get("/tournamentList").then(response => {

      console.log(response.data)

      const [tourn] = response.data.tournaments.filter(tournament => {
        return tournament.tournament_id === parseInt(tourn_id)
      });

      setTournament(tourn? tourn: false);

    }).catch(err => {
      console.log(err)
    })


    // get sports
    axiosInstance.get(`/tournament/getSports/${tourn_id}`).then(
      response => {
        let Sports = response.data.sports;

        console.log(Sports)


        //get teams
        axiosInstance.get(`/teams/${tourn_id}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
          }
        }).then(response => {
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

    axiosInstance.get(`/${tourn_id}/matchList`).then(response => {
      const matches = response.data.matches;

      const orgMatches = {}

      matches.forEach(match => {
        if (match.sportName in orgMatches) {
          orgMatches[match.sportName].push(match)
        } else {
          orgMatches[match.sportName] = [match]
        }
      })
  
      setSortedMatches(orgMatches);

    })


  }, [tourn_id, history])

  if(tournament === null || sortedMatches===null || sortedTeams === null){
    return (
        <Loading />
    )
  }
  else
  return (
    <Grid container className={classes.container} spacing={4}>
      <Grid item sm={12} lg={12}>
        {tournament ? <TournDetails tournament={tournament} />: (
          <Grid item sm={6}>
                <Alert severity="error">Tournament does not exist</Alert>
          </Grid>
        )}
      </Grid>
      <Grid item sm={12}>
        <Paper className={classes.wrapPaper}>
          <Typography variant="h2">
            Teams
          </Typography>
          <Grid container spacing={6}>
            {(Object.keys(sortedTeams).length > 0) ? Object.keys(sortedTeams).map(sport => {
              return (
                <Grid item sm={6}>

                  <SportTeams teamData={sortedTeams[sport]} sport={sport} />

                </Grid>
              )
            }): (
              <Grid item sm={6}>
                <Alert severity="warning">No teams registered</Alert>
              </Grid>
              
              )}
          </Grid>

        </Paper>

      </Grid>


      <Grid item sm={12}>
        <Paper className={classes.wrapPaper}>
          <Typography variant="h2">
            Matches
        </Typography>
          <Grid container spacing={6}>
            {(Object.keys(sortedMatches).length >0) ? Object.keys(sortedMatches).map(sport => {
              return (
                <Grid item sm={6}>
                  <SportMatches matches={sortedMatches[sport]} sport={sport} />
                </Grid>

              )

            }): (
              <Grid item sm={6}>
                <Alert severity="warning">No matches scheduled</Alert>
              </Grid>
              
              )}
          </Grid>
        </Paper>

      </Grid>



      {/* <Grid item sm={6}>
        {sortedMatches && <SportMatches sortedMatches={sortedMatches}/>}
      </Grid> */}
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
    <Paper elevation={1} className={classes.paper} >
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
    <Paper elevation={1} className={classes.wrapPaper}>
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

function SportMatches({ matches, sport }) {

  const classes = useStyles();

  const [open, setOpen] = useState(null);

  function handleCollapse(id) {
    id !== open ? setOpen(id) : setOpen(null);
  }

  return (
    matches.map(match => {
      return (
        <Paper elevation={1} className={classes.paper}>
          <Typography variant="h5" color="primary">{sport}</Typography>
          <List>
            <ListItem button key={match.match_id} onClick={() => handleCollapse(match.match_id)}>
              <ListItemText primary={`${match.team1.teamName} vs ${match.team2.teamName}`} />
              {open === match.match_id ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto">
              <List component="div" disablePadding>
                <ListItem>
                  <ListItemText primary={match.date} secondary={"Date"} className={classes.nested} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={match.startTime} secondary={"Start Time"} className={classes.nested} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={match.round} secondary={"Round"} className={classes.nested} />
                </ListItem>
              </List>
            </Collapse>
          </List>

        </Paper>
      )
    })
  )

}

export default ViewTourn;