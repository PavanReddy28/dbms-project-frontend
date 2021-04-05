import React, { useState, useEffect } from 'react'
import { axiosInstance } from '../../axiosInstance'
import {Alert} from "@material-ui/lab";
import {Link} from "react-router-dom";
import { 
    CssBaseline,
    Grid,
    Typography,
    Paper,
    List,
    ListItem,
    ListItemText,
    Button,
    IconButton,
    Divider,
    Collapse, } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useHistory } from "react-router-dom";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AM_Tourn from './AM_Tourn'
import AM_teams from './AM_teams'
import AM_time from './AM_time'

const useStyles = makeStyles((theme) => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
}));

const AddMatch = () => {

    const classes = useStyles();
    const [Matches, setMatches] = useState([])
    const [Tournaments, setTournaments] = useState([])
    const [activeStep, setActiveStep] = useState(0);
    const [Teams, setTeams] = useState([])

    useEffect(() => {
        
        axiosInstance.get('/tournament', {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        }).then(response => {
            setTournaments(response.data.tournaments);
        }).catch(err => console.log(err));

    }, [])

    const addTeams = (tourn1, sportName) => {
        console.log(tourn1)
        console.log(sportName)
        axiosInstance.get('/sport/teams', {
            params:{
                'tournament_id' : tourn1.tournament_id,
                'sportName' : sportName
            } 
        }).then(response => {
            //console.log(response.data)
            setTeams(response.data.teams);
        }).catch(err => console.log(err));

        setActiveStep(activeStep + 1);
    }

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    }

    const handleBack = () => {
        setActiveStep(activeStep - 1);      
    };

    function getStepContent(step)
    {
        switch (step) {
        case 0:
            return <AM_Tourn Tournaments={Tournaments} handleNext={addTeams}/>;
        case 1:
            return <AM_teams Teams={Teams} handleNext={handleNext} handleBack={handleBack}/>;
        case 2:
            //return <AM_time />;
        default:
            return(
                <>
                    <Alert severity="success">Successfully Added.</Alert>
                    <Link to ="/Dashboard">
                        <Button variant="contained" color="primary" className={classes.button}>Return to Matches</Button>
                    </Link>
                </>
            )
    }
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography component="h1" variant="h4" align="center">
                    Match Scheduling
                </Typography>
                <React.Fragment>
                    {getStepContent(activeStep)}
                </React.Fragment>
            </Paper>
            </main>
        </React.Fragment>
    )
}

export default AddMatch
