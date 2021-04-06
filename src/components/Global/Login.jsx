import React, {useState} from "react";
import {Container, TextField, Button, Typography, makeStyles} from '@material-ui/core'
import {axiosInstance} from '../../axiosInstance';
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    form: {
        marginTop: "10%"
    }
}))


function Login() {


    const history = useHistory();

    const classes = useStyles();

    const [userName, setUserName] = useState("");
    const [passWord, setPassWord] = useState("");
    const [flag, setFlag] = useState(false);

    function authenticate(event) {

        // send a post request to backend for a jwt token
        axiosInstance.post("/login",{

            "username":userName,
            "password": passWord
        })
        .then(response => {

            // store the token if it exists into the local storage
            localStorage.setItem("accessToken", response.data.access_token);
            // go to base url after login
            history.replace("/dashboard")

        }).catch((err) => {

            // error is thrown whenever wrong credentials are put
            if(err.response.status === 400){

                setFlag(true);

            } else {
                console.log(err);
            }
        });

        event.preventDefault();
    }


    return (
        <Container maxWidth="xs" className={classes.form}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
            <form>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Username"
                    name="username"
                    autoFocus
                    onChange = {event => setUserName(event.target.value)}
                    value = {userName}
                    error = {flag}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange = {event => setPassWord(event.target.value)}
                    value = {passWord}
                    error = {flag}
                    helperText = {flag && "Invalid credentials"}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick = {authenticate}
                >Sign in</Button>
            </form>
        </Container>
    )
}

export default Login;