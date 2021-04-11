import { SportsBasketballRounded, SportsCricketRounded, SportsSoccerRounded, SportsTennisRounded } from '@material-ui/icons'
import React, {useState} from 'react'
import {
    Typography,
    makeStyles,
    Paper,
    IconButton
} from '@material-ui/core';
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
import { axiosInstance } from '../../axiosInstance';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '6px 16px',
    },
    secondaryTail: {
        backgroundColor: theme.palette.secondary.main,
    },
}));

const TimeLine = ({ results, openDialog, sportData, sport, status, delRequest }) => {

    const classes = useStyles()
    const [score, setScores] = useState({})

    const icons = (sport) => {
        if(sport==='Basketball')
        {
            return (<SportsBasketballRounded/>)
        }
        else if(sport==='Tennis')
        {
            return (<SportsTennisRounded/>)
        }
        else if(sport==='Football')
        {
            return (<SportsSoccerRounded/>)
        }
        else if(sport==='Cricket')
        {
            return (<SportsCricketRounded/>)
        }
        else if(sport==='Badminton' || sport==='Tennis' || sport==='Table Tennis')
        {
            return (<SportsTennisRounded/>)
        }
    }

    const scores = (match, sport) => {

        if(sport==='Basketball' || sport==='Football' ||sport==='Hockey')
        {
            if(results){
                console.log(results)
                return(
                    results.filter(m => {
                    return match.match_id===m.match_id
                }).map(result=>{
                    console.log('ENTER result')
                    return (
                        <React.Fragment>
                        <Typography  >
                        Scores
                        </Typography>
                        <Typography gutterBottom>
                            {result.t1score} - {result.t2score}
                        </Typography>
                        </React.Fragment>
                    )
                }))
            }
        }
        else if(sport==='Cricket')
        {
            if(results){
                
                console.log(results)
                return(
                results.filter(m => {
                    return match.match_id===m.match_id
                }).map(result=>{
                    console.log('ENTER',result)
                    return (
                        <React.Fragment>
                        <Typography >
                            {match.team1.teamName}
                        </Typography>
                        <Typography gutterBottom>
                            {result.t1Innings.runs}/{result.t1Innings.wickets}
                        </Typography>
                        <Typography >
                            {match.team1.teamName}
                        </Typography>
                        <Typography gutterBottom>
                            {result.t2Innings.runs}/{result.t2Innings.wickets}
                        </Typography>
                        </React.Fragment>
                    )
                })
                )
        }
        }
        else if(sport==='Badminton' || sport==='Tennis' || sport==='Table Tennis')
        {
            if(results){
                
                console.log(results)
                return(results.filter(m => {
                    return match.match_id===m.match_id
                }).map(result=>{
                    console.log('ENTER',result)
                    
                    return (
                        <React.Fragment>
                            <Typography  >
                            Set 1
                        </Typography>
                            <Typography gutterBottom>
                                {result.set1.team1} - {result.set1.team2}
                            </Typography>
                            <Typography >
                                Set 2
                            </Typography>
                            <Typography gutterBottom>
                                {result.set2.team1} - {result.set2.team2}
                            </Typography>
                            <Typography >
                                Set 3
                            </Typography>
                            <Typography gutterBottom>
                                {result.set3.team1!==null || result.set3.team2!==null? `${result.set3.team1} - ${result.set3.team2}` : 'NA'}
                            </Typography>
                        </React.Fragment>
                    )
                })) }
        }
    }

    const setPage = (status1) => {
        if(status1)
        {
            if(!sportData.complete)
            {
                return
            }
            console.log('S Enter complete')
            return(sportData.complete.map( match => {
                return (
                    <TimelineItem>
                        <TimelineOppositeContent>
                        <Typography variant="body2" color="textSecondary">
                            {match.date} {match.startTime}
                        </Typography>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                        <TimelineDot color="primary" variant="outlined">
                            {icons(sport)}
                        </TimelineDot>
                        <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                        <Card elevation={3} className={classes.paper}>
                            <CardContent>
                                <Typography variant="h6" component="h1">
                                {match.team1.teamName} VS {match.team2.teamName}
                                </Typography>
                                <Typography>{sport}</Typography>
                                <Typography>{match.round}</Typography>
                                <Accordion>
                                    <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    >
                                    <Typography variant='h6'>Result</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {scores(match, sport)}
                                    </AccordionDetails>
                                </Accordion>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary" onClick={() => openDialog(match, sport, 'edit')}>
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
        else{
            if(!sportData.pending)
            {
                return
            }
            console.log('S Enter pending')
               return( sportData.pending.map( match => {
                    return (
                        <TimelineItem>
                            <TimelineOppositeContent>
                            <Typography variant="body2" color="textSecondary">
                                {match.date} {match.startTime}
                            </Typography>
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                            <TimelineDot color="primary" variant="outlined">
                                {icons(sport)}
                            </TimelineDot>
                            <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                            <Card elevation={3} className={classes.paper}>
                                <CardContent>
                                    <Typography variant="h6" component="h1">
                                    {match.team1.teamName} VS {match.team2.teamName}
                                    </Typography>
                                    <Typography>{sport}</Typography>
                                    <Typography gutterBottom>{match.round}</Typography>
                                </CardContent>
                                <CardActions>
                                <Button size="small" color="primary" onClick={() => openDialog(match, sport, 'add')}>
                                    Add Scores
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
    }

    return (
        <React.Fragment>
            {setPage(status)}
        </React.Fragment>
    )
}

export default TimeLine
