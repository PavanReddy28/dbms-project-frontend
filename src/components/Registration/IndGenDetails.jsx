import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  alert: {
    width: "100%",
    margin: "15px 0px"
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

const IndGenDetails = ({ Team, onAdd, handleNext, handleBack }) => {

  const classes = useStyles();

  const [team, setTeam] = useState(Team);
  const [incomplete, setIncomplete] = useState(false);

  const onSubmit = () => {

    // Find cleaner implementation
    if (!team.team_name || !team.college || !team.cFirstName || !team.cLastName || !team.cAge) {
      setIncomplete(true);
      return
    }

    setIncomplete(false)
    onAdd(team);
    handleNext();
  };

  const onhSubmit = (e) => {
    onAdd(team);
    handleBack(1);
  };

  return (
    <React.Fragment>
      <Grid item xs={12} lg={12}>
        {incomplete && <Alert className={classes.alert} severity="error">Please fill all fields</Alert>}
      </Grid>
      <Typography variant="h6" gutterBottom>
        General Details
        </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required={true}
            id="team_name"
            name="team_name"
            label="Nick Name"
            value={team.team_name ? team.team_name : ""}
            onChange={(e) => setTeam(previous => {
              return {
                ...previous,
                [e.target.name]: e.target.value
              }
            })}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required={true}
            id="college"
            name="college"
            label="College/Organization"
            onChange={(e) => setTeam(previous => {
              return {
                ...previous,
                [e.target.name]: e.target.value
              }
            })}
            value={team.college ? team.college : ""}
            fullWidth
          />
        </Grid>
      </Grid>
      <Typography variant="h6" gutterBottom className={classes.title}>
        Player Details
          </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required={true}
            id="cFirstName"
            name="cFirstName"
            label="First Name"
            onChange={(e) => setTeam(previous => {
              return {
                ...previous,
                [e.target.name]: e.target.value
              }
            })}
            value={team.cFirstName ? team.cFirstName : ""}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required={true}
            id="cLastName"
            name="cLastName"
            label="Last Name"
            onChange={(e) => setTeam(previous => {
              return {
                ...previous,
                [e.target.name]: e.target.value
              }
            })}
            value={team.cLastName ? team.cLastName : ""}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required={true}
            id="cAge"
            name="cAge"
            label="Age"
            onChange={(e) => setTeam(previous => {
              return {
                ...previous,
                [e.target.name]: e.target.value
              }
            })}
            value={team.cAge ? team.cAge : ""}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required={true}
            id="contact"
            name="contact"
            label="Mobile No."
            onChange={(e) => setTeam(previous => {
              return {
                ...previous,
                [e.target.name]: e.target.value
              }
            })}
            value={team.contact ? team.contact : ""}
            fullWidth
          />
        </Grid>

        <div className={classes.buttons}>
          <Button onClick={onhSubmit} className={classes.button}>
            Back
            </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={onSubmit}
            className={classes.button}>
            Next
            </Button>
        </div>
      </Grid>
    </React.Fragment>
  );
}
export default IndGenDetails