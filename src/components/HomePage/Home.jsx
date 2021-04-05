import React from "react";
import { Typography, Grid, Card, CardHeader, CardContent, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import TournList from "./TournList"

function Home() {

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

    const routeChange = () =>{ 
        let path = `./TournSportReg`; 
        history.push(path);
      }

    return (
        // <Grid container justify="center">
        //     <Grid item>
        //         <Typography variant="h4">Welcome to the tournament management app!</Typography>
        //     </Grid>

        // </Grid>
        <>
            <Typography variant="h3" align="center">Welcome to the Tournament Management App!</Typography>
            <Typography variant="subtitle1" align="center">An app to help with your tournament hassle</Typography>
            <Typography variant="body1" align="center">We offer an app to help you manage tournaments</Typography>
            <hr></hr>
            <div>
                <Typography variant="h3" align="center">Features Offered</Typography>
                <Grid container alignItems="flex-end">
                    {/* <Grid item>
                    <Card>
                        <CardHeader title="Register Players" titleTypographyProps={{ align: 'center' }} />
                        <CardContent>
                            <Typography>Add new players which play in different sports</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item>
                    <Card>
                        <CardHeader title="Register Players" titleTypographyProps={{ align: 'center' }} />
                        <CardContent>
                            <Typography>Add new players which play in different sports</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item>
                    <Card>
                        <CardHeader title="Register Players" titleTypographyProps={{ align: 'center' }} />
                        <CardContent>
                            <Typography>Add new players which play in different sports</Typography>
                        </CardContent>
                    </Card>
                </Grid> */}

                    {featureCards.map((item,index) => {
                        return (
                            <Grid item key={index} sm={12} md={4} lg={4}>
                                <Card>
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
            </div>
        </>

    )
}

export default Home;