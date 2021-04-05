import React, { useState } from 'react'
import { Grid, 
    Checkbox, 
    Accordion, 
    AccordionSummary, 
    AccordionDetails, 
    FormControlLabel , 
    Typography, 
    List, 
    makeStyles, Button} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {Alert} from "@material-ui/lab";

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
}))

const AM_teams = ({ Teams, handleNext, handleBack }) => {

    const classes = useStyles()

    const [mTeams, setmTeams] = useState([])
    const [incomplete, setIncomplete] = useState(false);

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
                {Teams.map(team => {
                        console.log(team)
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
                                            if(val.length<2)
                                            {
                                                if(val.indexOf(team.team_name) > -1)
                                                {
                                                    val = val.filter(v => v!==team.team_name)
                                                }
                                                else{
                                                    val = val.concat(team.team_name)
                                                }
                                            }
                                            else
                                            {
                                                setIncomplete(true)
                                            }
                                            //console.log(val, val.length)
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
                                    
                                </AccordionDetails>
                            </Accordion>
                        )
                    })}
                <List className={classes.list}>
                </List>
                </div>
                <div className={classes.buttons}>
                    <Button onClick={handleBack} className={classes.button}>
                        Back
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}>
                        Next
                    </Button>
                </div>
            {/* </Paper> */}
        </React.Fragment>
    )
}

export default AM_teams
