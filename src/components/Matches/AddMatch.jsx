import React, { useState, useEffect } from 'react'
import { axiosInstance } from '../../axiosInstance'
import {Alert} from "@material-ui/lab";
import {Link} from "react-router-dom";
import { 
    CssBaseline,
    Typography,
    Paper,
    Button, } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import AM_Tourn from './AM_Tourn'
import AM_teams from './AM_teams'

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
    const [Tournaments, setTournaments] = useState([])
    const [activeStep, setActiveStep] = useState(0);
    const [Teams, setTeams] = useState([])
    const [tourn, settourn] = useState({})
    const [mTeams, setmTeams] = useState([])
    const [sport, setsport] = useState('')
    const [time, setTime] = useState('')
    const [round, setRound] = useState('')

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
        // console.log(tourn1)
        // console.log(sportName)
        settourn(tourn1)
        setsport(sportName)
        axiosInstance.get(`/${tourn1.tournament_id}/${sportName}/teams`).then(response => {
            console.log(response.data.teams)
            setTeams(response.data.teams.filter(team => {
                return team.status==='REGISTERED'
            }));
        }).catch(err => console.log(err));

        setActiveStep(activeStep + 1);
    }

    const handleBack = () => {
        setActiveStep(activeStep - 1);      
    };

    const onSubmit = () => {
        console.log(mTeams, Teams.filter(team => team.team_name===mTeams[0]))
        let id1 = Teams.filter(team => team.team_name===mTeams[0])[0].team_id
        let id2 = Teams.filter(team => team.team_name===mTeams[1])[0].team_id
        const Match = {
            "tournament_id": tourn.tournament_id,
            "team1_id": id1,
            "team2_id": id2,
            "sportName": sport,
            "date": time,
            "round": round
        }
        console.log(Match)
        
        axiosInstance.post('/match', Match,{
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        }).then(response => setActiveStep(activeStep + 1)).catch(err => console.log(err));
    }

    function getStepContent(step)
    {
        switch (step) {
        case 0:
            return <AM_Tourn Tournaments={Tournaments} handleNext={addTeams}/>;
        case 1:
            return <AM_teams Teams={Teams} mTea={setmTeams} setTime={setTime} r={round} round={setRound} handleNext={onSubmit} handleBack={handleBack}/>;
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
