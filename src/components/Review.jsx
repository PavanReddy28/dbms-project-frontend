import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Typography, List, ListItem, ListItemText, Grid } from '@material-ui/core'

const Tournament = [
    {
        id: 1,
        general : {
            tournName: "Arena",
            organizer: "BITS Pilani Hyderabad",
            location: "Hyderabad, Telangana"
        },
        sports : {
            teamSports: [
                'Basketball',
                'Cricket'
            ],
            indivSports: [
                'Tennis',
                'Badminton'
            ]
        }        
    },
    {
        id: 2,
        general : {
            tournName: "Spree",
            organizer: "BITS Pilani Goa",
            location : "Goa"
        },
        sports : {
            teamSports: [
                'Basketball',
                'Soccer',
            ],
            indivSports: [
                'Tennis',
                'Table Tennis',
            ]
        }
    }
]

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
}));

const Review = () => {

    const classes = useStyles();

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Tournament Summary
            </Typography>
            <List disablePadding>
                <ListItem className={classes.listItem} key={Tournament[0].id}>
                    <ListItemText primary={Tournament[0].general.tournName} secondary={Tournament[0].general.organizer} />
                    <Typography variant="body2">{}</Typography>
                </ListItem>
            </List>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom className={classes.title}>
                        Location
                    </Typography>
                    <Typography gutterBottom>{Tournament[0].general.organizer}</Typography>
                    <Typography gutterBottom>{Tournament[0].general.location}</Typography>
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom className={classes.title}>
                        Sports Being Organized
                    </Typography>
                    <Typography gutterBottom>{Tournament[0].sports.teamSports.join(', ')}</Typography>
                    <Typography gutterBottom>{Tournament[0].sports.indivSports.join(', ')}</Typography>                            
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default Review
