import { SportsBasketballRounded, SportsCricketRounded, SportsSoccerRounded, SportsTennisRounded } from '@material-ui/icons'
import React from 'react'
import {
    Typography,
    makeStyles,
    Paper,
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


const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '6px 16px',
    },
    secondaryTail: {
        backgroundColor: theme.palette.secondary.main,
    },
}));

const TimeLine = ({ openDialog, sportData, sport, status }) => {

    const classes = useStyles()

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
                                <Typography>{match.round}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary" onClick={() => openDialog(match, sport)}>View Scores</Button>
                            </CardActions>
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
