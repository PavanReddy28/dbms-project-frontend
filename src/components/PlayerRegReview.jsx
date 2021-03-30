import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    listItem: {
        padding: theme.spacing(1, 0),
    },
    total: {
        fontWeight: 700,
    },
    title: {
        marginTop: theme.spacing(2),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));

const PlayerRegReview = ({ Team, playerData, handleNext, handleBack }) => {

    const classes = useStyles();

    const onSubmit = (e) => {
        handleNext();
    };

    const onhSubmit = (e) => {
        handleBack();
    };

    const playerDataRender = (i) => {
        return (
            <Grid item xs={12}>
                <Typography variant="h6" gutterBottom className={classes.title}>
                Team Members : {Team.num_players}
                </Typography>
                <Typography gutterBottom>
                    {playerData.players[i].firstName} {playerData.players[i].firstName} : {playerData.players[i]}
                </Typography>
            </Grid>
        )
    }

    return (
        <React.Fragment>
            <Typography variant="h5" gutterBottom>
                Review
            </Typography>
            <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom className={classes.title}>
                    {Team.team_name}
                    </Typography>
                    <Typography variant="body2">{Team.college}</Typography>
                </Grid>
            <Grid container spacing={2}>
                {() => {
                    const ind=parseInt(Team.num_players);
                    while(ind>0)
                    {
                        playerDataRender(ind);
                    }
                }}
                
                <div className={classes.buttons}>
                    <Button onClick={onhSubmit} className={classes.button}>
                        Back
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={onSubmit}
                        className={classes.button}>
                        Create
                    </Button>
                </div>
            </Grid>
        </React.Fragment>
    )
}

export default PlayerRegReview
