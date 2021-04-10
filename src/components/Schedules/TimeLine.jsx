import { SportsBasketballRounded, SportsCricketRounded, SportsSoccerRounded, SportsTennisRounded } from '@material-ui/icons'
import React, {useState} from 'react'
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
import { axiosInstance } from '../../axiosInstance';

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

    // const scores = (match, sport) => {
    //     console.log(score)
        
    //     if(sport==='Basketball' || sport==='Football' ||sport==='Hockey')
    //     {
    //         axiosInstance.get(`/match/team/result/${match.match_id}`).then(
    //             responses => {
    //                 console.log(responses.data, 'fuck')
    //                 setScores(responses.data)
    //             }
    //         ).catch(err=>console.log(err))
            
    //         if(score){
    //         return (
    //             <Typography gutterBottom>
    //                 {score.t1Score} - {score.t2Score}
    //             </Typography>
    //         )}
    //     }
    //     else if(sport==='Cricket')
    //     {
    //         axiosInstance.get(`/match/cricket/result/${match.match_id}`).then(
    //             responses => {
    //                 console.log(responses.data)
    //                 setScores(responses.data)
    //             }
    //         ).catch(err=>console.log(err))
    //         if(score){
    //         return (
    //             <React.Fragment>
    //             <Typography variant="body">
    //                 {match.team1.teamName}
    //             </Typography>
    //             <Typography gutterBottom>
    //                 {score.t1Innings.runs}/{score.t1Innings.wickets}
    //             </Typography>
    //             <Typography variant="body">
    //                 {match.team1.teamName}
    //             </Typography>
    //             <Typography gutterBottom>
    //                 {score.t2Innings.runs}/{score.t2Innings.wickets}
    //             </Typography>
    //             </React.Fragment>
    //         )}
    //     }
    //     else if(sport==='Badminton' || sport==='Tennis' || sport==='Table Tennis')
    //     {
    //         axiosInstance.get(`/match/net/result/${match.match_id}`).then(
    //             responses => {
    //                 console.log(responses.data, 'Nigga')
    //                 setScores(responses.data)
    //             }
    //         ).catch(err=>console.log(err))
    //         if(score.set1){
    //         return (
    //             <React.Fragment>
    //             <Typography gutterBottom>
    //                 {score.set1.team1} - {score.set1.team2}
    //             </Typography>
    //             <Typography gutterBottom>
    //                 {score.set2.team1} - {score.set2.team2}
    //             </Typography>
    //             <Typography gutterBottom>
    //                 {score.set3? `${score.set3.team1} - ${score.set3.team2}` : ''}
    //             </Typography>
                
    //             </React.Fragment>
    //         )}
    //     }
    // }
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
                        <TimelineDot>
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
                                {/* {scores(match, sport)} */}
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary" onClick={() => openDialog(match, sport, 'edit')}>
                                    Edit Scores</Button>
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
                            <TimelineDot>
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
                                </CardContent>
                                <CardActions>
                                <Button size="small" color="primary" onClick={() => openDialog(match, sport, 'add')}>
                                    Add Scores</Button>
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
