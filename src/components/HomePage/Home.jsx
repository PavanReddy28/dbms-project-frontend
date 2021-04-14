import React from "react";
import { Typography, Grid, Card, CardHeader, CardContent, Button, makeStyles, Container } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import TournList from "./TournList";
import HomeMatchSchedules from "../HomeSchedules/HomeMatchSchedules"

const useStyles = makeStyles((theme) => ({
    card: {
        minHeight: "300px"
    },
    heroContent: {
        padding: theme.spacing(16, 0, 12)
    },
    container: {
        marginTop: "10px"
    },
    cardHeader: {
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
    },
    cardContent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginTop: theme.spacing(2),
    },
    registerText: {
        padding: theme.spacing(16, 0, 12),
        textAlign: "center",
    },
    registerButton: {
        marginTop: "3.5rem"
    },
    tournList: {
        marginBottom: "10%"
    }
}))

function Home() {

    const classes = useStyles()

    const featureCards = [
        {
            heading: "Register Players",
            content: "Add new players which play in different sports"
        },
        {
            heading: "Schedule matches",
            content: "Set matches for different sports without clashes"
        },
        {
            heading: "Variety of sports",
            content: "The application offers features for various sports like football, tennis, basketball etc."
        }
    ]

    const history = useHistory();


    return (

        <>
            <Container minWidth="sm" component="main" className={classes.heroContent}>
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Welcome to the Tournament Management App!
                </Typography>
                <Typography variant="h5" align="center" color="textSecondary" component="p">
                    An app to help with your tournament hassle
                </Typography>
            </Container>
            <Container maxWidth="md">
                <Grid container alignItems="flex-end" spacing={5} className={classes.container}>


                    {featureCards.map((item, index) => {
                        return (
                            <Grid item key={index} sm={12} md={4} lg={4}>
                                <Card className={classes.card}>
                                    <CardHeader title={item.heading} titleTypographyProps={{ align: 'center' }} className={classes.cardHeader} />
                                    <CardContent>
                                        <div className={classes.cardContent}>
                                            <Typography>{item.content}</Typography>
                                        </div>

                                    </CardContent>
                                </Card>
                            </Grid>
                        )
                    })}

                </Grid>
            </Container>
            <Container maxWidth="md">
                <div className={classes.registerText}>
                    <Typography component="h3" variant="h3" align="center" color="textPrimary" gutterBottom>
                        Register your teams
                </Typography>
                    <Typography variant="h6" align="center" color="textSecondary" component="p" maxWidth="md">
                        Once you register your team to a particular tournament, the organizer will be able to view the details and add you accordingly
                </Typography>
                    <Button color="primary" variant="contained" onClick={() => history.push("/tournSportReg")} className={classes.registerButton}>Register</Button>
                </div>
                <Grid container className={classes.tournList}>
                    <Grid item sm={12}>
                        <TournList />
                    </Grid>
                </Grid>
            </Container>
            
            <Container maxWidth="lg">
                <HomeMatchSchedules/>   
            </Container>        


        </>

    )
}

export default Home;