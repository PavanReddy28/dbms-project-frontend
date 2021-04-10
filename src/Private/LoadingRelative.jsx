import React from "react";
import {makeStyles} from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    
    loading: {
      position: "relative",
      top: "50%",
      left: "50%"
    }
  }))

function LoadingRelative() {

    const classes = useStyles();

    return(
        <CircularProgress className={classes.loading}/>
    )
}

export default LoadingRelative;