import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Stepper, Step, StepLabel, Button } from '@material-ui/core';
import { Alert } from "@material-ui/lab";
import { axiosInstance } from "../../axiosInstance";
import { Link } from "react-router-dom";
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


const PlayerReg = ({ info, data, onAdd, goBack }) => {

    const classes = useStyles();
    const [Team, setTeam] = React.useState(data.team ? data.team : {});
    // const [TeamData, setTeamData] = React.useState({})
    const [playerData, setplayerData] = React.useState(data.player ? data.player : []);
    const [activeStep, setActiveStep] = React.useState(0);

    const handleSubmit = () => {

        //Team Data 
        const dataTeam = {
            "tournament_id": info.tourn.tournId[0],
            "team_name": Team.team_name,
            "college": Team.college,
            "num_players": Team.num_players,
            "captain": {
                "fname": Team.cFirstName,
                "lname": Team.cLastName,
                "age": Team.cAge
            },
            "sportName": info.sport,
            "contact": Team.contact,
        };
        console.log(dataTeam);

        axiosInstance.post("/team", dataTeam).then(
            response => {
                console.log(response.data)
                // setTeamData({team_id : response.data.tID})
                const dataPlayer = {
                    "tournament_id": info.tourn.tournId[0],
                    "team_id": response.data.team_id,
                    "players": playerData
                };
                console.log(dataPlayer);

                axiosInstance.post("/player", dataPlayer).then(response => setActiveStep(activeStep + 1))
                    .catch(err => console.log(err));
            }
        ).catch(err => console.log(err));



    };

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    }

    const handleBack = (num) => {
        if (num === 0) {
            setActiveStep(activeStep - 1);
        }
        else {
            onAdd({ team: Team, player: playerData })
            goBack()
        }
    };

    const steps = ['Team Details', 'Team Members', 'Review'];


    function getStepContent(step) {
        switch (step) {
            case 0:
                return <TeamCapDetails Team={Team} onAdd={addTeam} handleNext={handleNext} handleBack={handleBack} />;
            case 1:
                return <TeamDetails playerData={playerData} TeamNum={Team} onAdd={addplayerData} handleNext={handleNext} handleBack={handleBack} />;
            case 2:
                return <PlayerRegReview Team={Team} info={info} playerData={playerData} handleNext={handleSubmit} handleBack={handleBack} />;
            default:
                return (
                    <>
                        <Alert severity="success">Successfully Registered.</Alert>
                        <Link to="/">
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

export default PlayerReg