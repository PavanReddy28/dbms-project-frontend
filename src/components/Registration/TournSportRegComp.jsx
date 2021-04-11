import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button, Select, MenuItem } from '@material-ui/core';
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
  

export const TournSportRegComp = ({ TournData, tList, onAdd , handleNext }) => {
    const classes = useStyles()

    //const [TournList, setTournList] = useState([])
    const [Tourn, setTourn] = useState(TournData? TournData : {})
    const [incomplete, setIncomplete] = useState(false);

    // useEffect(() => {
    //     axiosInstance.get('/tournamentList').then(
    //         response => {
    //             //console.log(response.data.tournaments)
    //             setTournList(response.data.tournaments)
    //         }
    //     ).catch(err => console.log(err))
    // }, [])

    const goNext = () => {    
        if(Object.keys(Tourn).length === 0)
        {
          setIncomplete(true);
          return 
        }
        console.log(Tourn)
        onAdd(Tourn)
        handleNext()
    };

    return(
        <React.Fragment>
            <Grid item xs={12} lg={12}>
                    {incomplete && <Alert className={classes.alert} severity="error">Please Choose a Tournament.</Alert>}
            </Grid>
            <Typography variant="h6" gutterBottom>
            Choose a Tournament
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                <Select
                    required={true}
                    id="tournName"
                    name="tournName"
                    label="Tournament"
                    //defaultValue={Tourn.length>0 && Tourn? Tourn.tournName:""}
                    onChange={(e)=>setTourn({[e.target.name]: e.target.value, 
                        tournId: tList.filter(tourn => tourn.t_name===e.target.value).map(item => item.tournament_id)})}
                    value={Tourn? Tourn.tournName:""}                       
                    >
                    {tList.map((tourn, index) => (
                        <MenuItem key={index} value={tourn.t_name}>
                            {tourn.t_name}
                        </MenuItem>
                    ))}
                    </Select>
                </Grid>
                <div className={classes.buttons}>
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

export default TournSportRegComp