import React, { useEffect, useState } from 'react';
import Timeline from '@material-ui/lab/Timeline';
import { useHistory } from "react-router-dom";
import AddMatch from './AddMatch'
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
    Dialog,
    DialogActions,
    DialogContentText,
    DialogTitle,
    DialogContent,
    Divider
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import SportsIcon from '@material-ui/icons/Sports';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { axiosInstance } from '../../axiosInstance';
import TimeLine from './TimeLine'
import TimeLine2 from './TimeLine2'

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '6px 16px',
    },
    secondaryTail: {
        backgroundColor: theme.palette.secondary.main,
    },
    list: {
        maxHeight: "300px",
        overflow: "auto"
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
        margin: theme.spacing(3),
        padding: theme.spacing(2),
        minHeight: 300
    },
}));

export default function MacthSchedules() {

    const classes = useStyles();
    const history = useHistory();
    const [Tournaments, setTournaments] = useState([])
    const [TournID, setTournID] = useState()
    const [sportName, setsportName] = useState(null)
    const [sportData, setSportData] = useState({})
    const [tournData,  setTournData] = useState({})
    const [open, setOpen] = useState({
        main: null,
        sportList: null
    })
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [activeStep, setActiveStep] = useState();


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

    function activateDialog(type) {
        type === "delete" ? setDeleteOpen(true) : setEditOpen(true);
    }

    function handleCancel(type) {
        type === "delete" ? setDeleteOpen(false) : setEditOpen(false);
    }

    const handleStep = (num, info) => {
        if(num===0)
        {
            setsportName(info)
            axiosInstance.get(`/matches/${TournID}/${info}`).then(
                response => {
                    //console.log(response.data)
                    setSportData(response.data.matches)  
                    setActiveStep(num)        
                }
            ).catch(err => console.log(err))
        }
        else if(num===1)
        {
            setTournID(info)
            console.log(`/${info}/matchList`)
            axiosInstance.get(`/${info}/matchList`).then(
                response => {
                    console.log(response.data)
                    setTournData(response.data.matches) 
                    setActiveStep(num)         
                }
            ).catch(err => console.log(err))
        }
    }

    const timeLineSet = (step) => {

        switch (step) {
            case 0:
                return <TimeLine sportData={sportData} sport={sportName}/>
            case 1:
                return <TimeLine2 Tourn={tournData} />;
            default:
                return(
                    <>
                        <IconButton>
                            <SportsIcon />
                        </IconButton>
                    </>
                )
    }}

    return (
        <React.Fragment>
            <Paper className={classes.paper}>
            <Grid container spacing={10} className={classes.container}>
                <Grid item lg={6} sm={12}>
                    <Grid container>
                        <Grid item sm={6} lg={6}>
                            <Typography variant="h5" color="primary">Schedules</Typography>
                        </Grid>
                        <Grid item sm={6} lg={6}>
                            <IconButton onClick={() => activateDialog("add")} className={classes.addIcon}>
                                <AddIcon />
                            </IconButton>
                        </Grid>
                    </Grid>

                    <List className={classes.list}>
                        {Tournaments.map(tournament => {
                            return (
                                <>
                                    <ListItem button fullWidth key={tournament.tournament_id} onClick={() => {
                                        handleCollapse(tournament.tournament_id)
                                        //setTournID(tournament.tournament_id)
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
                <AddMatch editOpen={editOpen} setEditOpen={setEditOpen} onClose={() => handleCancel("edit")}/>
                <Grid item lg={6} sm={12}>
                    <Timeline align="alternate">
                        {timeLineSet(activeStep)}
                    </Timeline>
                </Grid>
            </Grid>
            </Paper>
        </React.Fragment>
    );
}