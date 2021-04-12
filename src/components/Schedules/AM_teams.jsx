import React, { useState, useEffect } from 'react'
import { Grid, 
    Checkbox, 
    Accordion, 
    AccordionSummary, 
    AccordionDetails, 
    FormControlLabel , 
    Typography, 
    List, 
    TextField,
    Select,
    MenuItem,
    makeStyles, Button} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {Alert} from "@material-ui/lab";
import moment from 'moment';
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    alert: {
        width: "100%",
        margin: "15px 0px"
    },
    paper: {
        padding: "30px",
    },
    list: {
        maxHeight: "300px",
        overflow: "auto"
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    time: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    }
}))

const AM_teams = ({ Teams, mTea, setTime, r, round, handleNext, handleBack }) => {

    const classes = useStyles()

    const rounds = ['Finals', 'Semi Finals', 'Quarter Finals', 'Round Robin', 'Groups', 'Round of 16', 'Round of 32']
    const [mTeams, setmTeams] = useState([])
    const [incomplete, setIncomplete] = useState(false);
    const [incomplete1, setIncomplete1] = useState(false);

    useEffect(() => {
        //console.log(Teams.length===0, Teams.length)
        if(Teams.length===0)
        {
            setIncomplete1(true)
            //console.log(incomplete1)
        } else {
            setIncomplete1(false)
        }
    }, [Teams])

    const goToStatus = () => {

    }

    const incompleteCheck = () => {
        console.log(Teams.length)
        if(Teams.length<2)
        {
            setIncomplete1(true)
            //console.log(incomplete1)
        }
        else {
            setIncomplete1(false)
        }
        return incomplete1
    }

    return (
        <React.Fragment>
             {/* <Paper className={classes.paper} elevation={1}> */}
             <div className={classes.paper}>
                <Grid item xs={12} lg={12}>
                    {incomplete && <Alert className={classes.alert} severity="error">Please choose only two fields.</Alert>}
                </Grid>
                <Grid container>
                    <Typography variant="h5" color="primary">Select Teams</Typography>
                </Grid>
                <Grid item xs={12} lg={12}>
                    {incomplete1 && 
                    <>
                        <Alert className={classes.alert} severity="error">No teams are Registered / Accepted. Please update the team's status.</Alert>
                        <Link to ="/Registrations">
                            <Button variant="contained" color="primary" className={classes.button}>Go to Status</Button>
                        </Link>
                    </>
                    }
                </Grid>
                
                <List className={classes.list}>
                {
                Teams.map(team => {
                        //console.log(team)
                        return (
                            <Accordion>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-label="Expand"
                                aria-controls="additional-actions2-content"
                                id="additional-actions2-header"
                                >
                                <FormControlLabel
                                    aria-label="Acknowledge"
                                    onClick={(event) => {
                                        setmTeams(previous => {
                                            //console.log(mTeams)
                                            let val = [...previous]
                                            //console.log(val, val.length)
                                            if(val.length>=2)
                                            {
                                                setIncomplete(true);
                                            } else{
                                                setIncomplete(false);
                                            }
                                            if(val.indexOf(team.team_name) > -1)
                                            {
                                                val = val.filter(v => v!==team.team_name)
                                            }
                                            else{
                                                val = val.concat(team.team_name)
                                            }
                                            console.log(val, val.length)
                                            mTea(val)
                                            return val                                           
                                        })
                                        event.stopPropagation()                                        
                                    }}
                                    onFocus={(event) => event.stopPropagation()}
                                    control={<Checkbox />}
                                    label={team.team_name}
                                     
                                />
                                </AccordionSummary>
                                <AccordionDetails>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        {/* <Typography variant="h6" gutterBottom className={classes.title}>
                                        {team.team_name}
                                        </Typography> */}
                                        <Typography gutterBottom>College/Organization : {team.college}</Typography>
                                        <Typography gutterBottom>No. of Players : {team.num_players}</Typography>
                                    </Grid>
                                    <Grid item container direction="column" xs={12} sm={6}>
                                        <Typography gutterBottom>Sport : {team.sportName} </Typography>
                                        <Typography gutterBottom>Contact Info : {team.contact}</Typography>                           
                                    </Grid>    
                                </Grid>        
                                </AccordionDetails>
                            </Accordion>
                        )
                    })}
                
                </List>
                </div>
                <div className={classes.time}>          
                <form className={classes.container} noValidate>
                    <TextField
                        id="datetime-local"
                        label="Next appointment"
                        type="datetime-local"
                        defaultValue={moment().format("YYYY-MM-DDThh:mm")}
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        onChange={(ev) => {
                            if (!ev.target['validity'].valid)
                            {
                                return;
                            }
                            let dt= ev.target['value'];
                            // dt = moment(dt).format()
                            console.log(dt)
                            setTime(dt);
                        }
                        }
                    />
                </form>
                <div className={classes.time}>
                <Select
                    required={true}
                    id="round"
                    name="round"
                    label="Round"
                    //defaultValue=''
                    onChange={(e)=>round(e.target.value)}
                    value={r? r:rounds[0]}                       
                    >
                    {rounds.map((tourn, index) => (
                        <MenuItem key={index} value={tourn}>
                            {tourn}
                        </MenuItem>
                    ))}
                </Select>
                </div>
                </div>
                <div className={classes.buttons}>
                    <Button onClick={handleBack} className={classes.button}>
                        Back
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            console.log(mTeams.length)
                            if(mTeams.length!==2)
                            {
                                setIncomplete(true)
                            }
                            if(mTeams.length===2){
                                //mTea(mTeams)
                                handleNext()
                            }
                        }}
                        className={classes.button}>
                        Submit
                    </Button>
                </div>
            {/* </Paper> */}
        </React.Fragment>
    )
}

export default AM_teams
