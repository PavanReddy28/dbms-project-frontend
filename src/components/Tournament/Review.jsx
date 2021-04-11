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

const Review = ({ Tournament, sports, handleNext, handleBack }) => {

    const classes = useStyles();

    const onSubmit = (e) => {
        handleNext();
    };

    const onhSubmit = (e) => {
        handleBack();
    };

    return (
        <React.Fragment>
            <Typography variant="h5" gutterBottom>
                Review
            </Typography>
            <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom className={classes.title}>
                    {Tournament.tournName}
                    </Typography>
                    <Typography variant="body2">{Tournament.college}</Typography>
                </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom className={classes.title}>
                        Location
                    </Typography>
                    <Typography gutterBottom>{Tournament.college}</Typography>
                    <Typography gutterBottom>{Tournament.address}</Typography>
                    <Typography gutterBottom>{Tournament.city}</Typography>
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom className={classes.title}>
                        Sports Being Organized
                    </Typography>
                    <Typography gutterBottom>{sports.teamSport.join(', ')}</Typography>
                    <Typography gutterBottom>{sports.indivSport.join(', ')}</Typography>                            
                </Grid>
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

export default Review
