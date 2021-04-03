import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { axiosInstance } from '../axiosInstance'
import { Grid, Typography, Button, Select, MenuItem, InputLabel } from '@material-ui/core';
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
  

export const TourSportSelectComp = ({ Tourn, sportData, onAdd , handleNext, handleBack }) => {
    const classes = useStyles()

    const [sportsList, setSportsList] = useState([])
    const [incomplete, setIncomplete] = useState(false);
    console.log(sportData)
    const [sport, setSport] = useState(sportData? sportData : 'Sport')

    useEffect(() => {
        axiosInstance.get('/tournament/getSports', {
            params: {
              tournament_id: Tourn.tournId[0]
            }
          }).then(
            response => {
                console.log(response.data.sports)
                setSportsList(response.data.sports)
            }
        ).catch(err => console.log(err))
    }, [])

    const goNext = () => {    
        if(!sport || sport==='Sport')
        {
          setIncomplete(true);
          return 
        }
        onAdd(sport)
        handleNext()
    };

    const goBack = () => {
        onAdd(sport)
        handleBack()
    }

    return(
        <React.Fragment>
            <Grid item xs={12} lg={12}>
                    {incomplete && <Alert className={classes.alert} severity="error">Please fill all fields</Alert>}
            </Grid>
            <Typography variant="h6" gutterBottom>
            Select a sport
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Select
                    required={true}
                    id="sport"
                    name="sport"
                    label="Team Sport"
                    onChange={(e)=>setSport(e.target.value)}
                    value={sport? sport:""}
                    
                    >
                    {sportsList.map((name) => (
                    <MenuItem key={name} value={name}>
                        {name}
                    </MenuItem>
                    ))}
                    </Select>
                </Grid>
                <div className={classes.buttons}>
                    <Button 
                        onClick={goBack} 
                        className={classes.button}>
                        Back
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={goNext}
                        className={classes.button}>
                        Next
                    </Button>
                </div>
            </Grid>
        </React.Fragment>      
    )
}

export default TourSportSelectComp