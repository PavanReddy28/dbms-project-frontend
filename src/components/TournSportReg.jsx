import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { axiosInstance } from '../axiosInstance';
import { CssBaseline, Paper, Typography, Button, Grid } from '@material-ui/core';
import TournSportRegComp from './TournSportRegComp';
import TourSportSelectComp from './TourSportSelectComp';
import PlayerReg from './PlayerReg';
import IndPlayerReg from './IndPlayerReg';

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
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));

export const TournSportReg = () => {

    const classes = useStyles();

    const [TournList, setTournList] = useState([])
    const [Tourn, setTourn] = useState({})
    const [sport, setSport] = useState('')
    const [data, setData] = useState({})
    const [activeStep, setActiveStep] = useState(0);
    // const [sportsList, setSportsList] = useState([])

    useEffect(() => {
        axiosInstance.get('/tournamentList').then(
            response => {
                //console.log(response.data.tournaments)
                setTournList(response.data.tournaments)
            }
        ).catch(err => console.log(err))
    }, [])

    const genSportsList = {
        teamSports: [
            'Basketball',
            'Football',
            'Cricket'
        ],
        indivSports: [
            'Tennis',
            'Table Tennis',
            'Badminton'
        ]
    };

    const handleNext = () => {
        if(activeStep===0)
        {
            setActiveStep(1);
        }
        else if(activeStep===1)
        {
            console.log(sport)
            console.log(sport in genSportsList.indivSports, genSportsList.indivSports.indexOf(sport) > -1)
            if(genSportsList.teamSports.indexOf(sport) > -1)  
            {  
                setActiveStep(2);    
            }
            else if(genSportsList.indivSports.indexOf(sport) > -1)  
            {  
                setActiveStep(3);   
            }
        }
    };
    
    const handleBack = () => {
        if(activeStep===1)
        {
            setActiveStep(0);
        }
        else if(activeStep>1)
        {
            setActiveStep(1);
        }
    }

    const addTourn = (tourn) => {
        console.log(tourn)
        setTourn(tourn)       
    }

    const addSport = (sport1) => {
        console.log(sport1)
        setSport(sport1)
    }

    const onAdd = (data1) => {
        setData(data1)
    }

    function getStepContent(step)
    {
        switch (step) {
        case 0:
            return <TournSportRegComp TournData={Tourn} tList={TournList} onAdd={addTourn} handleNext={handleNext}/>;
        case 1:
            return <TourSportSelectComp Tourn={Tourn} sportData={sport} onAdd={addSport} handleNext={handleNext} handleBack={handleBack}/>;
        case 2:
            return <PlayerReg info={{tourn: Tourn, sport: sport}} data={data} onAdd={onAdd} goBack={handleBack}/>;
        case 3:
            return <IndPlayerReg info={{tourn: Tourn, sport: sport}} data={data} onAdd={onAdd} goBack={handleBack}/>;
        default:
            break;
    }
    };

    return(
        <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
        <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
                Registration
            </Typography>
            <React.Fragment>
                {getStepContent(activeStep)}
            </React.Fragment>
        </Paper>
        </main>
        </React.Fragment>
    )
}

export default TournSportReg