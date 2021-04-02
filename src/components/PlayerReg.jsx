import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, Paper, Stepper, Step, StepLabel, Typography, Button } from '@material-ui/core';
import {Alert} from "@material-ui/lab";
import {axiosInstance} from "../axiosInstance";
import {Link} from "react-router-dom";
import TeamCapDetails from './TeamCapDetails';
import TeamDetails from './TeamDetails';
import PlayerRegReview from './PlayerRegReview';

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
  

const PlayerReg = () => {
    
    const classes = useStyles();
    const [Team, setTeam] = React.useState({});
    const [playerData, setplayerData] = React.useState([]);
    const [activeStep, setActiveStep] = React.useState(0);

    const handleSubmit = () => {

        //Team Data 
        const dataTeam = {
            "team_name": Team.team_name,
            "college": Team.college,
            "num_players": Team.num_players,
            "captain": {
                "fname":Team.cFirstName,
                "lname":Team.cLastName,
                "age":Team.cAge
            },
            "contact":Team.contact,
            "sportName":Team.sport,
        };
        console.log(dataTeam);

        //Player Data
        const dataPlayer = {
            "playerData":playerData
        }; 
        console.log(dataPlayer);

        axiosInstance.post("/team",dataTeam).catch(err => console.log(err));

        axiosInstance.post("/player",dataPlayer).then(response => setActiveStep(activeStep + 1))
        .catch(err => console.log(err));
    };

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    }

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const steps = ['Team Details', 'Team Members', 'Review'];



    function getStepContent(step)
    {
            switch (step) {
                case 0:
                    return <TeamCapDetails Team={Team} onAdd={addTeam} handleNext={handleNext}/>;
                case 1:
                    return <TeamDetails playerData={playerData} TeamNum={Team} onAdd={addplayerData} handleNext={handleNext} handleBack={handleBack}/>;
                case 2:
                    return <PlayerRegReview Team={Team} playerData={playerData} handleNext={handleSubmit} handleBack={handleBack}/>;
                default:
                    // throw new Error('Need to add Dashboard.');
                    return(
                        <>
                            <Alert severity="success">Team successfully added</Alert>
                            <Link to ="/Home">
                                <Button variant="contained" color="primary" className={classes.button}>Return to Home</Button>
                            </Link>
                        </>
                           
                    )
            }
    };

    const addTeam = (Team) => {
        console.log(Team);
        setTeam(Team);
    };

    const addplayerData = (playerData) => {
        console.log(playerData);
        setplayerData(playerData);
    };

    return (
        <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
        <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
                Create Team
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

export default PlayerReg