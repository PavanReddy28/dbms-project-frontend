import React, { useEffect, useState } from 'react';
import Timeline from '@material-ui/lab/Timeline';
import { useHistory } from "react-router-dom";
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
import AddIcon from '@material-ui/icons/Add';
import SportsIcon from '@material-ui/icons/Sports';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { axiosInstance } from '../../axiosInstance';
import TimeLine from './TimeLine'
import TimeLine2 from './TimeLine2'
import LoadingRelative from "../../Private/LoadingRelative"
import Matches from "./Matches"
import Delete from "./Delete"

const useStyles = makeStyles((theme) => ({
    // paper: {
    //     minHeight: 9000
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
        minHeight: 900,
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

export default function MatchSchedules() {

    const classes = useStyles();
    const history = useHistory();
    const [Tournaments, setTournaments] = useState([])
    const [TournID, setTournID] = useState()
    const [sportName, setsportName] = useState(null)
    const [sportData, setSportData] = useState({})
    const [tournData, setTournData] = useState({})
    const [open, setOpen] = useState({
        main: null,
        sportList: null
    })
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [activeStep, setActiveStep] = useState();
    const [diaSport, setDiaSport] = useState();
    const [status, setStatus] = useState(false)
    const [DiaData, setDiaData] = useState({})
    const [DiaType, setDiaType] = useState('')
    const [Num, setNum] = useState(0)
    const [DelMatch, setDelMatch] = useState('')
    const [sportResult, setSportResult] = useState([])
    const [tournResult, setTournResult] = useState({})

    useEffect(() => {

        axiosInstance.get("/tournament", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        }).then(response => {
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

    function activateDialog(match, sport, type) {
        setDiaType(type)
        setDiaSport(sport)
        console.log(match)
        if (type === 'edit') {
            setDiaSport(sport)
            if (sport === 'Cricket') {
                axiosInstance.get(`/match/cricket/result/${match.match_id}`).then(
                    responses => {
                        
                        setDiaData({ data: responses.data, m: match })
                        setDiaSport(sport)
                        setEditOpen(true)
                    }
                ).catch(err => console.log(err))
            }
            else if (sport === 'Football' || sport === 'Basketball' || sport === 'Hockey') {
                axiosInstance.get(`/match/team/result/${match.match_id}`).then(
                    responses => {
                        
                        setDiaData({ data: responses.data, m: match })
                        setDiaSport(sport)
                        setEditOpen(true)
                    }
                ).catch(err => console.log(err))
            }
            else if (sport === 'Tennis' || sport === 'Badminton' || sport === 'Table Tennis') {
                axiosInstance.get(`/match/net/result/${match.match_id}`).then(
                    responses => {
                        
                        setDiaData({ data: responses.data, m: match })
                        setDiaSport(sport)
                        setEditOpen(true)
                    }
                ).catch(err => console.log(err))

            }
        }
        else {
            
            setDiaData({ data: null, m: match })
            setEditOpen(true)
        }
    }

    const onCloseCancel = () => {
        setEditOpen(false)
    }

    const onCloseEdit = (result, sport, f, score) => {
        
        if (f === 'add') {
            
            if (sport === 'Cricket') {
                axiosInstance.post(`/match/cricket/result/${DiaData.m.match_id}`, {
                    'winner_id': result.winner_id,
                    't1Innings': score.t1Innings,
                    't2Innings': score.t2Innings
                }, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                    }
                }).then(response => {
                    
                    if (Num === 0) {
                        handleStep(Num, sport)
                    }
                    else {
                        handleStep(Num, TournID)
                    }
                })
                    .catch(err => {
                        if (err.response.status && err.response.status === 401) {
                            history.push("/login");
                        }
                    });
            }
            else if (sport === 'Football' || sport === 'Basketball' || sport === 'Hockey') {
                
                axiosInstance.post(`/match/team/result/${DiaData.m.match_id}`, result, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                    }
                }).then(response => {
                    
                    if (Num === 0) {
                        handleStep(Num, sport)
                    }
                    else {
                        handleStep(Num, TournID)
                    }
                })
                    .catch(err => {
                        if (err.response.status && err.response.status === 401) {
                            history.push("/login");
                        }
                    });
            }
            else if (sport === 'Tennis' || sport === 'Badminton' || sport === 'Table Tennis') {
                axiosInstance.post(`/match/net/result/${DiaData.m.match_id}`, {
                    'winner_id': result.winner_id,
                    'set1': score.set1,
                    'set2': score.set2,
                    'set3': score.set3
                }, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                    }
                }).then(response => {
                    
                    if (Num === 0) {
                        handleStep(Num, sport)
                    }
                    else {
                        handleStep(Num, TournID)
                    }
                })
                    .catch(err => {
                        if (err.response.status && err.response.status === 401) {
                            history.push("/login");
                        }
                    });
            }
        }
        else if (f === 'edit') {
            if (sport === 'Cricket') {
                axiosInstance.put(`/match/cricket/result/${DiaData.m.match_id}`, {
                    'winner_id': result.winner_id,
                    't1Innings': result.t1Innings,
                    't2Innings': result.t2Innings
                }, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                    }
                }).then(response => {
                    
                    if (Num === 0) {
                        handleStep(Num, sport)
                    }
                    else {
                        handleStep(Num, TournID)
                    }
                })
                    .catch(err => {
                        if (err.response.status && err.response.status === 401) {
                            history.push("/login");
                        }
                    });
            }
            else if (sport === 'Football' || sport === 'Basketball' || sport === 'Hockey') {
                
                axiosInstance.put(`/match/team/result/${DiaData.m.match_id}`, {
                    'winner_id': result.winner_id,
                    't1Score': result.t1score,
                    't2Score': result.t2score
                }, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                    }
                }).then(response => {
                    
                    if (Num === 0) {
                        handleStep(Num, sport)
                    }
                    else {
                        handleStep(Num, TournID)
                    }
                })
                    .catch(err => {
                        if (err.response.status && err.response.status === 401) {
                            history.push("/login");
                        }
                    });
            }
            else if (sport === 'Tennis' || sport === 'Badminton' || sport === 'Table Tennis') {
                axiosInstance.put(`/match/net/result/${DiaData.m.match_id}`, {
                    'winner_id': result.winner_id,
                    'set1': result.set1,
                    'set2': result.set2,
                    'set3': result.set3
                }, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                    }
                }).then(response => {
                   
                    if (Num === 0) {
                        handleStep(Num, sport)
                    }
                    else {
                        handleStep(Num, TournID)
                    }
                })
                    .catch(err => {
                        if (err.response.status && err.response.status === 401) {
                            history.push("/login");
                        }
                    });
            }
        }
        setEditOpen(false)
    }

    const handleStep = (num, info) => {
        setNum(num)
        if (num === 0) {
            setsportName(info)
            setSportData({})
            if (sportData) {
                setActiveStep(2)
            }
            axiosInstance.get(`/matches/completed/${TournID}/${info}`).then(
                response => {
                    
                    setSportData(previous => {
                        let val = { ...previous }
                        if (!val.pending) {
                            return { 'pending': [], 'complete': response.data.matches }
                        }
                        else {
                            return { ...previous, 'complete': response.data.matches }
                        }
                        //return {'complete': response.data.matches, 'pending':[]}
                    })

                         
                }
            ).catch(err => console.log(err))

            axiosInstance.get(`/matches/pending/${TournID}/${info}`).then(
                response => {
                    
                    setSportData(previous => {
                        let val = { ...previous }
                        if (!val.complete) {
                            return { 'complete': [], 'pending': response.data.matches }
                        }
                        else {
                            return { ...previous, 'pending': response.data.matches }
                        }
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
        else if (num === 1) {
            setTournID(info)
            if (tournData) {
                setActiveStep(2)
                setTournData({})
            }
            axiosInstance.get(`/${info}/matchList/completed`).then(
                response => {
                    
                    setTournData(previous => {
                        let val = { ...previous }
                        if (!val.pending) {
                            return { 'pending': [], 'complete': response.data.matches }
                        }
                        else {
                            return { ...previous, 'complete': response.data.matches }
                        }
                    })
                    

                }
            ).catch(err => console.log(err))

            axiosInstance.get(`/${info}/matchList/pending`).then(
                response => {
                    
                    setTournData(previous => {
                        let val = { ...previous }
                        if (!val.complete) {
                            return { 'complete': [], 'pending': response.data.matches }
                        }
                        else {
                            return { ...previous, 'pending': response.data.matches }
                        }
                    })
                    
                    setActiveStep(num)
                }
            ).catch(err => console.log(err))

            axiosInstance.get(`/tourn/results/${info}`).then(
                response => {
                   
                    setTournResult(response.data)
                    
                }
            ).catch(err => console.log(err))
        }
    }

    const handleDelete = () => {
        axiosInstance.delete('/match', {
            params: {
                'match_id': DelMatch
            },
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        }).then(response => {
            setDeleteOpen(false)
            
            if (Num === 0) {
                handleStep(Num, sportName)
            }
            else {
                handleStep(Num, TournID)
            }
        })
            .catch(err => console.log(err));
    }

    const delRequest = (match_id) => {
        setDelMatch(match_id)
        setDeleteOpen(true)
    }

    const timeLineSet = (step) => {

        switch (step) {
            case 0:
                return <TimeLine results={sportResult} delRequest={delRequest} openDialog={activateDialog} status={status} sportData={sportData} sport={sportName} />
            case 1:
                return <TimeLine2 results={tournResult} delRequest={delRequest} openDialog={activateDialog} status={status} Tourn={tournData} />
            case 2:
                return <LoadingRelative />
            default:
                return (
                    <Grid container>
                        <Grid item sm={12}>
                            <div className={classes.default}>
                                <SportsIcon style={{ fontSize: 100 }} />

                            </div>
                        </Grid>

                    </Grid>


                )
        }
    }

    return (
        <React.Fragment>
            <Paper className={classes.paper}>
                <Grid container spacing={3} className={classes.container}>
                    <Grid sm={12}>
                        <Grid container>
                            <Grid item sm={6} lg={6}>
                                <Typography variant="h5" color="primary">Schedules</Typography>
                            </Grid>
                            <Grid item sm={6} lg={6}>
                                <IconButton onClick={() => history.push("/addMatch")} className={classes.addIcon}>
                                    <AddIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item sm={12}>
                        <List className={classes.list}>
                            {Tournaments.map(tournament => {
                                return (
                                    <>
                                        <ListItem fullWidth key={tournament.tournament_id}>
                                            <ListItemText primary={tournament.t_name} />
                                            <IconButton onClick={() => {
                                                handleCollapse(tournament.tournament_id)
                                                setTournID(tournament.tournament_id)
                                                handleStep(1, tournament.tournament_id)
                                            }}>
                                                {open.main === tournament.tournament_id ? <ExpandLess /> : <ExpandMore />}
                                            </IconButton>

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
                                                                <ListItemText primary={sport} className={classes.sportNested} />
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

                    <Delete deleteOpen={deleteOpen} setDeleteOpen={setDeleteOpen} handleDelete={handleDelete} />
                    <Matches type={DiaType} data={DiaData} setData={setDiaData} editOpen={editOpen} sport={diaSport} onCloseCancel={onCloseCancel} onClose={onCloseEdit} />
                    <Grid item lg={12} sm={12}>
                        {open.main && <div className={classes.scheduleContainer}>
                            <div className={classes.buttons}>
                                <Button
                                    color="primary"
                                    variant={status === true ? "contained" : "outlined"}
                                    onClick={() => setStatus(true)}
                                    className={classes.button}>
                                    Completed
                            </Button>
                                <Button
                                    color="primary"
                                    variant={status === false ? "contained" : "outlined"}
                                    onClick={() => setStatus(false)}
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