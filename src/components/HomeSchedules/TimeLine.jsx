import { SportsBasketballRounded, SportsCricketRounded, SportsSoccerRounded, SportsTennisRounded } from '@material-ui/icons'
import React, {useState} from 'react'
import {
    Typography,
    makeStyles,
    Paper,
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
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
      },
}));

const TimeLine = ({ results, openDialog, sportData, sport, status }) => {

    const classes = useStyles()
    const [open, setOpen] = useState(false)

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

    console.log(sportData, 1)

    const setPage = (status1) => {
        if(status1)
        {
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
                                <Typography gutterBottom>{match.round}</Typography>
                                <ListItem button fullWidth onClick={() => {
                                    if(open===true)
                                    {
                                        setOpen(false)
                                    }
                                    else
                                    {
                                        setOpen(true)
                                    }
                                }}>
                                    <ListItemText primary={'Result'} />
                                    {open === true ? <ExpandLess /> : <ExpandMore />}
                                </ListItem>
                                <Divider />
                                <Collapse in={open===true} timeout="auto">
                                    {scores(match, sport)}
                                </Collapse>
                            </CardContent>
                        </Card>
                        </TimelineContent>
                    </TimelineItem>
                )
            }))

        }
        else{
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
                                    <Typography>{match.round}</Typography>
                                </CardContent>
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
