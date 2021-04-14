import { SportsBasketballRounded, SportsCricketRounded, SportsSoccerRounded, SportsTennisRounded } from '@material-ui/icons'
import React, { useState } from 'react'
import {
    Typography,
    makeStyles,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Divider,
    Collapse
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '6px 16px',
        backgroundColor: theme.palette.grey[900],
    },
    secondaryTail: {
        backgroundColor: theme.palette.secondary.main,
    },
    nested: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4)
    },
    timeline: {
        maxHeight: 900,
        minHeight: 900,
        overflow: "auto",
        backgroundColor: theme.palette.grey[800],
        borderRadius: 10,
        padding: theme.spacing(4)
    },
    timelineItem: {
        backgroundColor: theme.palette.grey[800],
    }

}));

const TimeLine2 = ({ results, openDialog, status, Tourn, delRequest }) => {

    const classes = useStyles()
    const [open, setOpen] = useState(null)

    const icons = (sport) => {
        if (sport === 'Basketball') {
            return (<SportsBasketballRounded />)
        }
        else if (sport === 'Tennis') {
            return (<SportsTennisRounded />)
        }
        else if (sport === 'Football') {
            return (<SportsSoccerRounded />)
        }
        else if (sport === 'Cricket') {
            return (<SportsCricketRounded />)
        }
        else if (sport === 'Badminton' || sport === 'Tennis' || sport === 'Table Tennis') {
            return (<SportsTennisRounded />)
        }
    }

    const scores = (match, sport) => {

        if (sport === 'Basketball' || sport === 'Football' || sport === 'Hockey') {
            if (results) {
                return (
                    results[sport].filter(m => {
                        return match.match_id === m.match_id
                    }).map(result => {
                        
                        return (
                            //     <React.Fragment>
                            // <Typography >
                            // Scores
                            // </Typography>
                            // <Typography gutterBottom>
                            //     {result.t1score} - {result.t2score}
                            // </Typography>
                            // </React.Fragment>
                            <List component="div">
                                <ListItemText primary={match.team1.team_id === result.winner_id ? match.team1.teamName : match.team2.teamName} secondary={"Winner"} className={classes.nested} />
                                <ListItemText primary={result.t1score} secondary={match.team1.teamName} className={classes.nested} />
                                <ListItemText primary={result.t2score} secondary={match.team2.teamName} className={classes.nested} />
                            </List>
                        )
                    })
                )
            }
        }
        else if (sport === 'Cricket') {
            if (results) {
                return (
                    results[sport].filter(m => {
                        return match.match_id === m.match_id
                    }).map(result => {

                        
                        return (
                            // <React.Fragment>
                            // <Typography variant="body">
                            //     {match.team1.teamName}
                            // </Typography>
                            // <Typography gutterBottom>
                            //     {result.t1Innings.runs}/{result.t1Innings.wickets}
                            // </Typography>
                            // <Typography variant="body">
                            //     {match.team1.teamName}
                            // </Typography>
                            // <Typography gutterBottom>
                            //     {result.t2Innings.runs}/{result.t2Innings.wickets}
                            // </Typography>
                            // </React.Fragment>
                            <List component="div">
                                <ListItemText primary={match.team1.team_id === result.winner_id ? match.team1.teamName : match.team2.teamName} secondary={"Winner"} className={classes.nested} />
                                <ListItemText primary={`${result.t1Innings.runs} runs for ${result.t1Innings.wickets} wickets`} secondary={match.team1.teamName} className={classes.nested} />
                                <ListItemText primary={`${result.t2Innings.runs} runs for ${result.t2Innings.wickets} wickets`} secondary={match.team2.teamName} className={classes.nested} />
                            </List>
                        )
                    })
                )
            }
        }
        else if (sport === 'Badminton' || sport === 'Tennis' || sport === 'Table Tennis') {
            if (results[sport]) {
                return (
                    results[sport].filter(m => {
                        return match.match_id === m.match_id
                    }).map(result => {
                        
                        return (
                            // <React.Fragment>
                            //     <Typography >
                            //     Set 1
                            // </Typography>
                            //     <Typography gutterBottom>
                            //         {result.set1.team1} - {result.set1.team2}
                            //     </Typography>
                            //     <Typography >
                            //         Set 2
                            //     </Typography>
                            //     <Typography gutterBottom>
                            //         {result.set2.team1} - {result.set2.team2}
                            //     </Typography>
                            //     <Typography >
                            //         Set 3
                            //     </Typography>
                            //     <Typography gutterBottom>
                            //         {result.set3.team1!==null || result.set3.team2!==null? `${result.set3.team1} - ${result.set3.team2}` : 'NA'}
                            //     </Typography>
                            // </React.Fragment>
                            <List component="div">
                                <ListItemText primary={match.team1.team_id === result.winner_id ? match.team1.teamName : match.team2.teamName} secondary={"Winner"} className={classes.nested} />
                                <ListItemText primary={`${result.set1.team1} - ${result.set1.team2}`} secondary={"Set 1"} className={classes.nested} />
                                <ListItemText primary={`${result.set2.team1} - ${result.set2.team2}`} secondary={"Set 2"} className={classes.nested} />
                                <ListItemText primary={`${result.set3.team1} - ${result.set3.team2}`} secondary={"Set 3"} className={classes.nested} />
                            </List>
                        )
                    })
                )
            }
        }
    }

    const setPage = (status) => {
        
        if (status) {
            if (!Tourn || !Tourn.complete) {
                return
            }
            else if (Tourn.complete && Tourn.complete.length === 0) {
                return <Alert severity="warning">No matches complete</Alert>
            }
            
            return (Tourn.complete.map(match => {

                return (
                    <TimelineItem>
                        <TimelineOppositeContent>
                            <Typography variant="body2" color="textSecondary">
                                {match.date} {match.startTime}
                            </Typography>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot color="primary" variant="outlined">
                                {icons(match.sportName)}
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent className={classes.timelineItem}>
                            <Card elevation={3} className={classes.paper}>
                                <CardContent>
                                    <Typography variant="h6" component="h1">
                                        {match.team1.teamName} VS {match.team2.teamName}
                                    </Typography>
                                    <Typography color="textSecondary">Sport: {match.sportName}</Typography>
                                    <Typography gutterBottom color="textSecondary">Round: {match.round}</Typography>
                                    <ListItem fullWidth>
                                        <ListItemText primary={'Result'} />
                                        <IconButton onClick={() => {
                                            if (open === match.match_id) {
                                                setOpen(null)
                                            }
                                            else {
                                                setOpen(match.match_id)
                                            }
                                        }}>
                                            {open === match.match_id ? <ExpandLess /> : <ExpandMore />}
                                        </IconButton>

                                    </ListItem>
                                    <Divider />
                                    <Collapse in={open === match.match_id} timeout="auto">
                                        {scores(match, match.sportName)}
                                    </Collapse>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="primary" onClick={() => openDialog(match, match.sportName, 'edit')}>
                                        Edit Scores
                                </Button>
                                    <IconButton size="small" onClick={() => delRequest(match.match_id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </TimelineContent>
                    </TimelineItem>
                )
            }))

        }
        else {
            

            if (!Tourn || !Tourn.pending) {
                return
            }

            else if (Tourn.pending && Tourn.pending.length === 0) {
                return <Alert severity="warning">No matches scheduled</Alert>
            }

            return (Tourn.pending.map(match => {
                return (
                    <>
                        <TimelineItem>
                            <TimelineOppositeContent>
                                <Typography variant="body2" color="textSecondary">
                                    {match.date} {match.startTime}
                                </Typography>
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot color="primary" variant="outlined">
                                    {icons(match.sportName)}
                                </TimelineDot>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                                <Card elevation={3} className={classes.paper}>
                                    <CardContent>
                                        <Typography variant="h6" component="h1">
                                            {match.team1.teamName} VS {match.team2.teamName}
                                        </Typography>
                                        <Typography color="textSecondary">Sport: {match.sportName}</Typography>
                                        <Typography gutterBottom color="textSecondary">Round: {match.round}</Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" color="primary" onClick={() => openDialog(match, match.sportName, 'add')}>
                                            Add Scores
                                </Button>
                                        <IconButton size="small" onClick={() => delRequest(match.match_id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </CardActions>
                                </Card>
                            </TimelineContent>
                        </TimelineItem>
                    </>
                )
            }))
        }
    }

    return (
        <div className={classes.timeline}>
            {setPage(status)}
        </div>
    )
}

export default TimeLine2
