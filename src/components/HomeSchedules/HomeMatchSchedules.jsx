import React, { useEffect, useState } from 'react';
import Timeline from '@material-ui/lab/Timeline';
import {
    Grid,
    Typography,
    makeStyles,
    Paper,
    List,
    ListItem,
    ListItemText,
    Button,
    IconButton,
    Collapse,
    Divider
} from '@material-ui/core';
import SportsIcon from '@material-ui/icons/Sports';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { axiosInstance } from '../../axiosInstance';
import TimeLine from './TimeLine'
import TimeLine2 from './TimeLine2'
import LoadingRelative from "../../Private/LoadingRelative"
//import Scores from './Scores';

const useStyles = makeStyles((theme) => ({
    // paper: {
    //     padding: '6px 16px',
    // },
    // secondaryTail: {
    //     backgroundColor: theme.palette.secondary.main,
    // },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    list: {
        overflow: "auto",
        minHeight: 300,
        maxHeight: 300
    },
    addIcon: {
        display: "block",
        marginLeft: "auto"
    },
    nested: {
        paddingLeft: theme.spacing(4)
    },
    sportNested: {
        paddingLeft: 2 * theme.spacing(4)
    },
    deleteButton: {
        color: "#ff3d00"
    },
    paper: {
        minHeight : 900,
        maxHeight : 900,
        overflow: 'auto',
        padding: theme.spacing(4),
    },
    scheduleContainer: {
        minHeight: 1000,
        maxHeight: 1000
    },
    default: {
        textAlign: "center",
    }
}));

export default function HomeMatchSchedules() {

    const classes = useStyles();
    const [Tournaments, setTournaments] = useState([])
    const [TournID, setTournID] = useState()
    const [sportName, setsportName] = useState(null)
    const [sportData, setSportData] = useState({})
    const [tournData, setTournData] = useState({})
    const [open, setOpen] = useState({
        main: null,
        sportList: null
    })
    //eslint-disable-next-line
    const [deleteOpen, setDeleteOpen] = useState(false);
    //eslint-disable-next-line
    const [editOpen, setEditOpen] = useState(false);
    const [activeStep, setActiveStep] = useState();
    const [status, setStatus] = useState(false)
    const [sportResult, setSportResult] = useState([])
    const [tournResult, setTournResult] = useState({})

    useEffect(() => {

        axiosInstance.get("/tournamentList").then(response => {
            setTournaments(response.data.tournaments);
        }).catch(err => console.log(err));

    }, [])

    //collapsible tournament list
    function handleCollapse(id) {
        id !== open.main ? setOpen(prev => {
            return {
                ...prev,
                main: id
            }
        }) : setOpen(prev => {
            return {
                ...prev,
                main: null
            }
        });
    }

    function activateDialog(match, sport) {
        if (sport === 'Cricket') {
            axiosInstance.get(`/match/cricket/result/${match.match_id}`).then(
                responses => {
                    
                    setEditOpen(true)
                }
            ).catch(err => console.log(err))
        }
        else if (sport === 'Football' || sport === 'Basketbal' || sport === 'Hockey') {
            axiosInstance.get(`/match/team/result/${match.m_id}`).then(
                responses => {
                   
                    setEditOpen(true)
                }
            ).catch(err => console.log(err))
        }
        else if (sport === 'Tennis' || sport === 'Badminton' || sport === 'Table Tennis') {
            axiosInstance.get(`/match/net/result/${match.m_id}`).then(
                responses => {
                    
                    setEditOpen(true)
                }
            ).catch(err => console.log(err))
        }

    }


    const handleStep = (num, info) => {
        if (num === 0) {
            setsportName(info)
            setSportData({})
            if (sportData) {
                setActiveStep(2)
            }
            axiosInstance.get(`/matches/completed/${TournID}/${info}`).then(
                response => {
                    
                    setSportData(previous => {
                        return { 'complete': response.data.matches }
                    })
                    axiosInstance.get(`/matches/pending/${TournID}/${info}`).then(
                        response => {
                            
                            setSportData(previous => {
                                return { ...previous, 'pending': response.data.matches }
                            })
                            
                            setActiveStep(num)
                        }
                    ).catch(err => console.log(err))

                    axiosInstance.get(`/results/${TournID}/${info}`).then(
                        response => {
                            
                            setSportResult(response.data.results)
                        }
                    ).catch(err => console.log(err))
                      
                }
            ).catch(err => console.log(err))

        }
        else if (num === 1) {
            setTournID(info)
            if (tournData) {
                setActiveStep(2)
                setTournData({})
            }
            axiosInstance.get(`/${info}/matchList/completed`).then(
                response => {
                    
                    setTournData(previous => {
                        return { 'complete': response.data.matches }
                    })
                    
                    axiosInstance.get(`/${info}/matchList/pending`).then(
                        response => {
                            
                            setTournData(previous => {
                                return { ...previous, 'pending': response.data.matches }
                            })
                            
                            setActiveStep(num)
                        }
                    ).catch(err => console.log(err))
                }
            ).catch(err => console.log(err))

            axiosInstance.get(`/tourn/results/${info}`).then(
                response => {
                    
                    setTournResult(response.data)
                    
                }
            ).catch(err => console.log(err))

        }
    }

    const timeLineSet = (step) => {

        switch (step) {
            case 0:
                return <TimeLine results={sportResult} openDialog={activateDialog} status={status} sportData={sportData} sport={sportName} />
            case 1:
                return <TimeLine2 results={tournResult} openDialog={activateDialog} status={status} Tourn={tournData} />
            case 2:
                return <LoadingRelative />
            default:
                return (
                    <>
                        <IconButton>
                            <SportsIcon style={{ fontSize: 100 }} />
                        </IconButton>
                    </>
                )
        }
    }

    return (
        <React.Fragment>
            <Paper className={classes.paper}>
            <Grid container spacing={3} className={classes.container}>
                <Grid sm={12}>
                    <Grid container>
                        <Typography variant="h5" color="primary">Schedules</Typography>
                    </Grid>
                </Grid>
                

                <Grid item sm={12}>
                    <List className={classes.list}>
                        {Tournaments.map(tournament => {
                            return (
                                <>
                                    <ListItem button fullwidth key={tournament.tournament_id} onClick={() => {
                                        handleCollapse(tournament.tournament_id)
                                        setTournID(tournament.tournament_id)
                                        handleStep(1, tournament.tournament_id)
                                    }}>
                                        <ListItemText primary={tournament.t_name} />
                                        {open.main === tournament.tournament_id ? <ExpandLess /> : <ExpandMore />}
                                    </ListItem>
                                    <Divider />
                                    <Collapse in={open.main === tournament.tournament_id} timeout="auto">
                                        <List component="div" disablePadding>
                                            {tournament.sports.map(sport => {
                                                return (
                                                    <>
                                                        <ListItem button key={sport} onClick={() => {
                                                            //setsportName(sport)
                                                            setTournID(tournament.tournament_id)
                                                            handleStep(0, sport)
                                                        }}>
                                                            <ListItemText primary={sport} className={classes.sportNested}/>
                                                        </ListItem>
                                                    </>
                                                )
                                            })}
                                        </List>
                                    </Collapse>
                                </>
                            )
                        })}
                    </List>
                </Grid>
                <Grid item lg={12} sm={12} xs={12}>
                {open.main && <div className={classes.scheduleContainer}>
                    <div className={classes.buttons}>
                    <Button 
                            color="primary"
                            variant={status === true ? "contained": "outlined"}
                            onClick={()=>setStatus(true)} 
                            className={classes.button}>
                            Completed
                        </Button>
                        <Button
                            color="primary"
                            variant={status === false ? "contained": "outlined"}
                            onClick={()=>setStatus(false)}
                            className={classes.button}>
                            Scheduled
                        </Button>
                    </div>
                    <Timeline align="alternate">
                        {timeLineSet(activeStep)}
                    </Timeline>
                </div>}
                </Grid>
            </Grid>
            </Paper>
        </React.Fragment>
    );
}