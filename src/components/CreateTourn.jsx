import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, Paper, Stepper, Step, StepLabel, Button, Typography } from '@material-ui/core'
import TournForm from './TournForm'
import SportData from './SportData'
import Review from './Review'

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
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
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
  
const steps = ['General Details', 'Sports Details', 'Review'];

function getStepContent(step)
{
        switch (step) {
            case 0:
                return <TournForm />;
            case 1:
                return <SportData />;
            case 2:
                return <Review />;
            default:
                throw new Error('Unknown step');
        }
}

const CreateTourn = () => {
    
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
        <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
                Tournament
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
                {steps.map((label) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
                ))}
            </Stepper>
            <React.Fragment>
                {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography variant="h5" gutterBottom>
                    "{Tournament[0].general.tournName}" Tournament will be Created shortly.
                    </Typography>
                    {/* <Typography variant="subtitle1">
                    
                    </Typography> */}
                </React.Fragment>
                ) : (
                <React.Fragment>
                    {getStepContent(activeStep)}
                    <div className={classes.buttons}>
                    {activeStep !== 0 && (
                        <Button onClick={handleBack} className={classes.button}>
                        Back
                        </Button>
                    )}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                    >
                        {activeStep === steps.length - 1 ? 'Create' : 'Next'}
                    </Button>
                    </div>
                </React.Fragment>
                )}
            </React.Fragment>
        </Paper>
        </main>
        </React.Fragment>
    )
}

export default CreateTourn
