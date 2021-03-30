import  React,{ useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, Grid, Typography, TextField, FormControlLabel, Checkbox, Button } from '@material-ui/core';
import {Alert} from "@material-ui/lab";

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

const TeamCapDetails = ({Team, onAdd, handleNext}) => {

    const classes = useStyles();

    const [team, setTeam] = useState(Team);
    const [incomplete, setIncomplete] = useState(false);

    const onSubmit = () => {

      // Find cleaner implementation
      if(!team.team_name || !team.college || !team.cFirstName || !team.cLastName || !team.cAge ||
        !team.sport || !team.num_players)
        {
          setIncomplete(true);
          return 
        }

        setIncomplete(false)
        onAdd(team);
        handleNext();
    };

  return(
    <React.Fragment>
    <Grid item xs={12} lg={12}>
            {incomplete && <Alert className={classes.alert} severity="error">Please fill all fields</Alert>}
        </Grid>
      <Typography variant="h6" gutterBottom>
        Tournament Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required={true}
            id="team_name"
            name="team_name"
            label="Team name"
            value={team.team_name? team.team_name : ""}
            onChange={(e)=>setTeam( previous => {
              return {
                ...previous,
                [e.target.name]: e.target.value
              }
            })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required={true}
            id="sport"
            name="sport"
            label="Team Sport"
            onChange={(e)=>setTeam( previous => {
              return {
                ...previous,
                [e.target.name]: e.target.value
              }
            })}
            value={team.sport?team.sport:""}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required={true}
            id="num_players"
            name="num_players"
            label="Player Numbers"
            onChange={(e)=>setTeam( previous => {
              return {
                ...previous,
                [e.target.name]: e.target.value
              }
            })}
            value={team.num_players?team.num_players:""}
            fullWidth
          />

        <Grid item xs={12} sm={6}>
          <TextField
            required={true}
            id="college"
            name="college"
            label="College/Organization"
            onChange={(e)=>setTeam( previous => {
              return {
                ...previous,
                [e.target.name]: e.target.value
              }
            })}
            value={team.college?team.college:""}
            fullWidth
          />
        </Grid>
      
          <FormControl className={classes.formControl}>
            <Typography variant="h6" gutterBottom className={classes.title}>
                    Captain Details
            </Typography>
            <Grid item xs={12}>
              <TextField
                required={true}
                id="cFirstName"
                name="cFirstName"
                label="First Name"
                onChange={(e)=>setTeam( previous => {
                  return {
                    ...previous,
                    [e.target.name]: e.target.value
                  }
                })}
                value={team.cFirstName?team.cFirstName:""}
                
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required={true}
                id="cLastName"
                name="cLastName"
                label="Last Name"
                onChange={(e)=>setTeam( previous => {
                  return {
                    ...previous,
                    [e.target.name]: e.target.value
                  }
                })}
                value={team.cLastName?team.cLastName:""}
                
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
              required={true}
              id="cAge" 
              name="cAge" 
              label="Age" 
              onChange={(e)=>setTeam( previous => {
                  return {
                    ...previous,
                    [e.target.name]: e.target.value
                  }
                })}
                value={team.cAge?team.cAge:""}
         
              />
            </Grid>
          </FormControl>

        <Grid item xs={12}>
          <TextField
            required={true}
            id="contact"
            name="contact"
            label="Mobile No."
            onChange={(e)=>setTeam( previous => {
              return {
                ...previous,
                [e.target.name]: e.target.value
              }
            })}
            value={team.contact?team.contact:""}
            
          />
        </Grid>
    
        </Grid>
        <div className={classes.buttons}>
        
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
export default TeamCapDetails