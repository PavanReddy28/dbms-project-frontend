import  React,{ useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, TextField, FormControlLabel, Checkbox, Button } from '@material-ui/core';
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
  }
}));

const TournForm = ({Tournament, onAdd, handleNext}) => {

    const classes = useStyles();

    // const [tournName, setTournName] = useState(Tournament.length!==0? Tournament.tournName : '')
    // const [college, setCollege] = useState(Tournament.length!==0? Tournament.college : '')
    // const [address, setAddress] = useState(Tournament.length!==0? Tournament.address : '')
    // const [city, setCity] = useState(Tournament.length!==0? Tournament.city : '')
    // const [state, setState] = useState(Tournament.length!==0? Tournament.state : '')
    // const [zip, setZip] = useState(Tournament.length!==0? Tournament.zip : '')
    // const [country, setCountry] = useState(Tournament.length!==0? Tournament.country : '')
    // const [saveAddress, setSaveAddress] = useState(false)
    const [tourn, setTourn] = useState(Tournament);
    const [incomplete, setIncomplete] = useState(false);

    const onSubmit = (e) => {
      // e.preventDefault()
      // Find cleaner implementation
      if(!tourn.t_name || !tourn.organizer || !tourn.address || !tourn.city || !tourn.state ||
        !tourn.zip || !tourn.country)
        {
          setIncomplete(true);
          return 
        }
        // onAdd({tournName, college , address, city, state, zip, country});
        setIncomplete(false)
        onAdd(tourn);
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
        <Grid item xs={12}>
          <TextField
            required={true}
            id="t_name"
            name="t_name"
            label="Tournament name"
            value={tourn.t_name? tourn.t_name : ""}
            onChange={(e)=>setTourn( previous => {
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
            id="organizer"
            name="organizer"
            label="College/Organizer"
            onChange={(e)=>setTourn( previous => {
              return {
                ...previous,
                [e.target.name]: e.target.value
              }
            })}
            value={tourn.organizer?tourn.organizer:""}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required={true}
            id="address"
            name="address"
            label="Address"
            onChange={(e)=>setTourn( previous => {
              return {
                ...previous,
                [e.target.name]: e.target.value
              }
            })}
            value={tourn.address?tourn.address:""}
            fullWidth
            autoComplete="shipping address-line1"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required={true}
            id="city"
            name="city"
            label="City"
            onChange={(e)=>setTourn( previous => {
              return {
                ...previous,
                [e.target.name]: e.target.value
              }
            })}
            value={tourn.city?tourn.city:""}
            fullWidth
            autoComplete="shipping address-level2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
          required={true}
          id="state" 
          name="state" 
          label="State/Province/Region" 
          onChange={(e)=>setTourn( previous => {
              return {
                ...previous,
                [e.target.name]: e.target.value
              }
            })}
            value={tourn.state?tourn.state:""}
          fullWidth 
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required={true}
            id="zip"
            name="zip"
            label="Zip / Postal code"
            onChange={(e)=>setTourn( previous => {
              return {
                ...previous,
                [e.target.name]: e.target.value
              }
            })}
            value={tourn.zip?tourn.zip:""}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required={true}
            id="country"
            name="country"
            label="Country"
            onChange={(e)=>setTourn( previous => {
              return {
                ...previous,
                [e.target.name]: e.target.value
              }
            })}
            value={tourn.country?tourn.country:""}
            fullWidth
            autoComplete="shipping country"
          />
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
export default TournForm