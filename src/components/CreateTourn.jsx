import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, Paper, Stepper, Step, StepLabel, Typography } from '@material-ui/core'
import TournForm from './TournForm'
import SportData from './SportData'
import Review from './Review'

// const Tournament = [
//     {
//         id: 1,
//         tournName: "Arena",
//         organizer: "BITS Pilani Hyderabad",
//         location: "Hyderabad, Telangana"              
//     },
//     {
//         id: 2,
//         tournName: "Spree",
//         organizer: "BITS Pilani Goa",
//         location : "Goa"
//     }
// ]

// const sports = [{
//     id:1,
//     teamSports: [
//         'Basketball',
//         'Cricket'
//     ],
//     indivSports: [
//         'Tennis',
//         'Badminton'
//     ]},
//     {
//         id:2,
//         teamSports: [
//             'Basketball',
//             'Soccer',
//         ],
//         indivSports: [
//             'Tennis',
//             'Table Tennis',
//         ]
//     }

// ]

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
  

const CreateTourn = () => {
    
    const classes = useStyles();
    const [Tournament, setTournament] = React.useState([]);
    const [sports, setSports] = React.useState([]);
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const steps = ['General Details', 'Sports Details', 'Review'];



    function getStepContent(step)
    {
            switch (step) {
                case 0:
                    return <TournForm onAdd={addTournament} handleNext={handleNext}/>;
                case 1:
                    return <SportData onAdd={addSports} handleNext={handleNext} handleBack={handleBack}/>;
                case 2:
                    return <Review Tournament={Tournament} sports={sports} handleNext={handleNext} handleBack={handleBack}/>;
                default:
                    throw new Error('Need to add Dashboard.');
            }
    };

    const addTournament = (Tourn) => {
        setTournament([Tourn]);
    };

    const addSports = (sport) => {
        setSports([sport]);
    };

    return (
        <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
        <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
                Create Tournament
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
                {steps.map((label) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
                ))}
            </Stepper>
            <React.Fragment>
                {getStepContent(activeStep)}
            </React.Fragment>
        </Paper>
        </main>
        </React.Fragment>
    )
}

export default CreateTourn
