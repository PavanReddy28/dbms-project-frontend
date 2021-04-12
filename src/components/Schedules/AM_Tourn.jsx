import React, { useState } from 'react'
import { 
    Grid,
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider,
    Collapse,
    makeStyles } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import LoadingRelative from '../../Private/LoadingRelative';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: "30px",
    },
    container: {
        margin: "10px"
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
    }
}));

const AddMatchTourn = ({ Tournaments, handleNext }) => {

    const classes = useStyles();
    const [open, setOpen] = useState({
        main: null,
        sportList: null
    })

    function handleSportsCollapse(id) {
        id !== open.sportList ? setOpen(prev => {
            return {
                ...prev,
                sportList: id
            }
        }) : setOpen(prev => {
            return {
                ...prev,
                sportList: null
            }
        });
    }

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

    const loading = () => {
        if(Tournaments.length===0)
        {
            return(<LoadingRelative/>)
        }
        else{
            return(
                Tournaments.map(tournament => {
                    return (
                        <>
                            <ListItem button key={tournament.tournament_id} onClick={() => handleCollapse(tournament.tournament_id)}>
                                <ListItemText primary={tournament.t_name} />
                                {open.main === tournament.tournament_id ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Divider />
                            <Collapse in={open.main === tournament.tournament_id} timeout="auto">
                                <ListItem button onClick={() => handleSportsCollapse(tournament.tournament_id, "sportList")}>
                                        <ListItemText primary={"Sports"} className={classes.nested} />
                                        {open.sportList === tournament.tournament_id ? <ExpandLess /> : <ExpandMore />}
                                    </ListItem>
                                <Collapse in={open.sportList === tournament.tournament_id} timeout="auto">
                                    <List component="div" disablePadding>
                                        {tournament.sports.map(sport => {
                                            return (
                                                <>
                                                    <ListItem button key={sport} onClick={() => handleNext(tournament, sport)}>
                                                        <ListItemText primary={sport} className={classes.sportNested}/>
                                                    </ListItem>
                                                </>
                                            )
                                        })}
                                    </List>
                                </Collapse>
                            </Collapse>
                        </>
                    )
                })
            )
        }
    }

    return (
        <React.Fragment>
             {/* <Paper className={classes.paper} elevation={1}> */}
             <div className={classes.paper}>
                <Grid container>
                    <Typography variant="h5" color="primary">Choose Tournament and Sport</Typography>
                </Grid>
                <List className={classes.list}>
                    {loading()}
                </List>
                </div>
            {/* </Paper> */}
        </React.Fragment>
    )
}

export default AddMatchTourn
