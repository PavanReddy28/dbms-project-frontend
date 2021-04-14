import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../axiosInstance";
import { useParams, useHistory } from "react-router-dom";
import { Paper, List, ListItem, ListItemText, Grid, Collapse, makeStyles, Typography, IconButton, Snackbar, Container } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Loading from "../../Private/Loading";
import VisibilityIcon from '@material-ui/icons/Visibility';


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(3),
    minHeight: 300,
    maxHeight: 300,
    overflow: "auto"
  },
  tournDetails: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(1),
  },
  wrapPaper: {
    padding: "30px",
    minHeight: "20rem",
    backgroundColor: "#424242"
  },
  container: {
    margin: "2% 0px",
    maxWidth: "100%"
  },
  teamContainer: {
    padding: "3%"
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  addIcon: {
    display: "block",
    marginLeft: "auto"
  },
  default: {
    marginTop: theme.spacing(3),
  }
}))

function ViewTourn({ auth }) {

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

      setTournament(tourn ? tourn : false);

    }).catch(err => {
      console.log(err)
    })


    // get sports
    axiosInstance.get(`/tournament/getSports/${tourn_id}`).then(
      response => {
        let Sports = response.data.sports;

        console.log(Sports)


        //get teams
        axiosInstance.get(`/teams/${tourn_id}`).then(response => {
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
          if (err.response.status && err.response.status === 401) {
            history.push("/login");
          }
        });



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

  if (tournament === null || sortedMatches === null || sortedTeams === null) {
    return (
      <Loading />
    )
  }
  else
    return (
      <Container maxWidth="xl">
        <Grid container className={classes.teamContainer} spacing={6}>
          <Grid item sm={12} lg={12}>
            <Typography variant="h2">
              Tournament Details
          </Typography>
            <Grid item sm={12} lg={12}>
              {tournament ? <TournDetails tournament={tournament} /> : (
                <Grid item sm={6}>
                  <Alert severity="error">Tournament does not exist</Alert>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>

        <Grid container className={classes.teamContainer}>
          <Grid item sm={12}>
            <Typography variant="h2">
              Teams
          </Typography>
            <Grid container spacing={2}>
              {(Object.keys(sortedTeams).length > 0) ? Object.keys(sortedTeams).map(sport => {
                return (
                  <Grid item sm={6}>

                    <SportTeams teamData={sortedTeams[sport]} sport={sport} />

                  </Grid>
                )
              }) : (
                <Grid item sm={6}>
                  <Alert severity="warning">No teams registered</Alert>
                </Grid>

              )}
            </Grid>



          </Grid>


        </Grid>
        <Grid container className={classes.teamContainer}>
          <Grid item sm={12}>

            <Grid container spacing={6}>
              <Grid item sm={6}>
                <Typography variant="h2">
                  Matches
              </Typography>
              </Grid>
              <Grid item sm={6}>
                {auth && <IconButton onClick={() => history.push("/addMatch")} className={classes.addIcon}><AddIcon /></IconButton>}
              </Grid>
              {(Object.keys(sortedMatches).length > 0) ? Object.keys(sortedMatches).map(sport => {
                return (
                  <Grid item sm={6}>
                    <SportMatches matches={sortedMatches[sport]} sport={sport} />
                  </Grid>

                )

              }) : (
                <Grid item sm={6}>
                  <Alert severity="warning">No matches scheduled</Alert>
                </Grid>

              )}
            </Grid>

          </Grid>
        </Grid>

      </Container>


    )
}

// function SportIcon(props) {
//   switch (props.sport) {
//     case "Basketball":
//       return <SportsBasketballIcon/>;

//     case "Football":
//       return <SportsSoccerIcon />;

//     case "Cricket":
//       return <SportsCricketIcon />

//     case "Hockey":
//       return <SportsHockeyIcon />

//     default:
//       return null;
//   }
// }

function SportTeams({ teamData, sport }) {

  const [open, setOpen] = useState(null);

  const classes = useStyles();
  const history = useHistory();

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
              <ListItem>
                <ListItemText primary={team.team_name} />
                <IconButton onClick={() => history.push(`/ViewTeam/${team.team_id}`)}>
                  <VisibilityIcon />
                </IconButton>
                <IconButton onClick={() => handleCollapse(team.team_id)} key={team.team_id}>
                  {open === team.team_id ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
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
      }) : (<Typography className={classes.default}>No Teams Present</Typography>)}
    </Paper>
  )
}

function TournDetails({ tournament }) {

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <Paper elevation={1} className={classes.tournDetails}>
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
        <ListItem>
          <ListItemText primary={"Sports"} />
          <IconButton onClick={() => setOpen(prev => !prev)}>
            {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
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
  const [snackBar, setSnackBar] = useState(false);

  function handleCollapse(id) {
    id !== open ? setOpen(id) : setOpen(null);
  }

  function deleteMatch(id) {
    axiosInstance.delete("/match", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
      },
      data: {
        "match_id": id
      }
    }).then(response => {
      window.location.reload();
      setSnackBar(true)
    }).catch(err => console.log(err))
  }

  const snackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackBar(false);
  };

  return (
    <>
      <Paper elevation={1} className={classes.paper}>
        <Typography variant="h5" color="primary">{sport}</Typography>
        {matches.map(match => {
          return (
            <List>
              <ListItem key={match.match_id}>
                <ListItemText primary={`${match.team1.teamName} vs ${match.team2.teamName}`} />
                <IconButton size="small" color="secondary" onClick={() => { deleteMatch(match.match_id) }}>
                  <DeleteIcon />
                </IconButton>
                <IconButton onClick={() => handleCollapse(match.match_id)}>
                  {open === match.match_id ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              </ListItem>
              <Collapse in={open === match.match_id} timeout="auto">
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

          )
        })}
      </Paper>
      <Snackbar open={snackBar} autoHideDuration={6000} onClose={snackClose}>
        <Alert variant="filled" onClose={snackClose} severity="success">
          Deleted Match!
        </Alert>
      </Snackbar>
    </>
  )

}

export default ViewTourn;