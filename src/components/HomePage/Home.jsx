import React from "react";
import { Typography, Grid, Card, CardHeader, CardContent, Button, Divider, makeStyles, Container } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import TournList from "./TournList";

const useStyles = makeStyles((theme) => ({
    card: {
        minHeight: "300px"
    },
    heroContent: {
        padding: theme.spacing(8, 0, 6)
    },
    container: {
        marginTop: "10px"
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

    const routeChange = () => {
        let path = `./TournSportReg`;
        history.push(path);
    }

    return (

        <>
            <Container maxWidth="sm" component="main" className={classes.heroContent}>
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Welcome to the Tournament Management App!
                </Typography>
                <Typography variant="h5" align="center" color="textSecondary" component="p">
                    An app to help with your tournament hassle
                </Typography>
            </Container>
            <Divider />
                <Grid container alignItems="flex-end" spacing={2} className={classes.container}>


                    {featureCards.map((item, index) => {
                        return (
                            <Grid item key={index} sm={12} md={4} lg={4}>
                                <Card className={classes.card}>
                                    <CardHeader title={item.heading} titleTypographyProps={{ align: 'center' }} />
                                    <CardContent>
                                        <Typography>{item.content}</Typography>
                                        <Button
                                            color='primary'
                                            onClick={routeChange}>
                                            {item.heading}
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        )
                    })}

                    <Grid item sm={12}>
                        <TournList />
                    </Grid>

                </Grid>
        </>

    )
}

export default Home;