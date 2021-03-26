import  React,{ useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, TextField, FormControlLabel, Checkbox, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  buttons: {
      display: 'flex',
      justifyContent: 'flex-end',
  },
  button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
  },
}));

const TournForm = ({onAdd, handleNext}) => {

    const classes = useStyles();

    const [tournName, setTournName] = useState("")
    const [college, setCollege] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zip, setZip] = useState('')
    const [country, setCountry] = useState('')
    const [saveAddress, setSaveAddress] = useState(false)

    const onSubmit = (e) => {
      //e.preventDefault()

      if(!tournName || !college || !address || !city || !state ||
        !zip || !country)
        {
          alert('Please fill all the fields.');
          return 
        }
        onAdd({tournName, college , address, city, state, zip, country});
        handleNext();
    };

  return(
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Tournament Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="TournName"
            name="TournName"
            label="Tournament name"
            value={tournName}
            onChange={(e)=>setTournName(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="organizer"
            name="organizer"
            label="College/Organizer"
            onChange={(e)=>setCollege(e.target.value)}
            value={college}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Address"
            onChange={(e)=>setAddress(e.target.value)}
            value={address}
            fullWidth
            autoComplete="shipping address-line1"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            value={city}
            onChange={(e)=>setCity(e.target.value)}
            fullWidth
            autoComplete="shipping address-level2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="state" 
          name="state" 
          label="State/Province/Region" 
          onChange={(e)=>setState(e.target.value)}
          value={state}
          fullWidth 
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            onChange={(e) => setZip(e.target.value)}
            value={zip}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            onChange={(e)=>setCountry(e.target.value)}
            value={country}
            fullWidth
            autoComplete="shipping country"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="primary" 
            name="saveAddress" 
            value={saveAddress}
            onChange={(e)=>setSaveAddress(e.currentTarget.checked)}/>}
            label="Use this address for future Tournments."
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