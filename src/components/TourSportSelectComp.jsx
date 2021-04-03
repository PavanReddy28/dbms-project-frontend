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
    const [sport1, setSport1] = useState(sportData? sportData : '')
    //console.log(sportData, sport1)

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
        if(!sport1)
        {
          setIncomplete(true);
          return 
        }
        onAdd(sport1)
        handleNext()        
    };

    const goBack = () => {
        onAdd(sport1)
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
                    id="sport1"
                    name="sport1"
                    label="Team Sport"
                    value={sport1? sport1:""}
                    onChange={(e)=>{
                        console.log(e.target.value)
                        //console.log(sport1, 'done 0')
                        setSport1(e.target.value)
                        // console.log(e.target.value)
                        console.log(sport1, 'done 1')
                        
                        // console.log('done 2')
                    }}
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