import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, Paper, Stepper, Step, StepLabel, Typography, Button } from '@material-ui/core';
import {Alert} from "@material-ui/lab";
import {axiosInstance} from "../axiosInstance";
import {Link} from "react-router-dom";
import IndReview from './IndReview';
import IndGenDetails from './IndGenDetails';

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
  

const IndPlayerReg = ({ info, data, onAdd, goBack }) => {
    
    const classes = useStyles();
    const [Team, setTeam] = React.useState(data.team? data.team : {});
    const [playerData, setplayerData] = React.useState([]);
    const [activeStep, setActiveStep] = React.useState(0);

    const handleSubmit = () => {

        //Team Data 
        const dataTeam = {
            "tournament_id": info.tourn.tournId[0],
            "team_name": Team.team_name,
            "college": Team.college,
            "num_players": 1,
            "captain": {
                "fname":Team.cFirstName,
                "lname":Team.cLastName,
                "age":Team.cAge
            },
            "sportName":info.sport,
            "contact":Team.contact,
        };
        console.log(dataTeam);

        axiosInstance.post("/team", dataTeam).then(
            response=>{
                // console.log(response.data)
                setActiveStep(activeStep + 1)
            }
        ).catch(err => console.log(err));       
    };

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    }

    const handleBack = (num) => {
        if(num===0)
        {
            setActiveStep(activeStep - 1);
        }
        else{
            onAdd({team: Team, player: playerData})
            goBack()
        }        
    };

    const steps = ['General Details', 'Review'];


    function getStepContent(step)
    {
            switch (step) {
                case 0:
                    return <IndGenDetails Team={Team} onAdd={addTeam} handleNext={handleNext} handleBack={handleBack}/>;
                case 1:
                    return <IndReview Team={Team} info={info} handleNext={handleSubmit} handleBack={handleBack}/>;
                default:
                    // throw new Error('Need to add Dashboard.');
                    return(
                        <>
                            <Alert severity="success">Successfully Registered.</Alert>
                            <Link to ="/">
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
        </React.Fragment>
    )
}

export default IndPlayerReg