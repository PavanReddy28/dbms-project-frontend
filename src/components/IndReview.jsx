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
        marginTop: theme.spacing(0),
    },
    title1: {
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

const IndReview = ({ Team, info, playerData, handleNext, handleBack }) => {

    const classes = useStyles();

    const onSubmit = (e) => {
        handleNext();
    };

    const onhSubmit = (e) => {
        handleBack(0);
    };

    return (
        <React.Fragment>
            <Typography variant="h5" gutterBottom>
                Review
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom className={classes.title}>
                    {Team.team_name}
                    </Typography>
                    <Typography gutterBottom>{Team.college}</Typography>
                    <Typography gutterBottom>Tournament : {info.tourn.tournName}</Typography>
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography gutterBottom>Captain : {Team.cFirstName} {Team.cLastName}</Typography>
                    <Typography gutterBottom>Contact Info : {Team.contact}</Typography>
                    <Typography gutterBottom>Sport : {info.sport}</Typography>                            
                </Grid>    
            </Grid>        
            <Grid container spacing={0}>
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

export default IndReview
