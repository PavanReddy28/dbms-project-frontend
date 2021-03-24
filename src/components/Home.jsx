import React from "react";
import { Typography } from "@material-ui/core";

function Home() {
    return (
        // <Grid container justify="center">
        //     <Grid item>
        //         <Typography variant="h4">Welcome to the tournament management app!</Typography>
        //     </Grid>

        // </Grid>
        <>
        <Typography variant="h4" align="center">Welcome to the Tournament Management App!</Typography>
        <Typography variant="subtitle1" align="center">An app to help with your tournament hassle</Typography>
        <Typography variant="body1" align="center">We offer an app to help you manage tournaments</Typography>
        </>

    )
}

export default Home;