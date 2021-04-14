import React, { useState } from "react";
import { Container, TextField, Button, Typography, makeStyles, Avatar } from '@material-ui/core'
import { axiosInstance } from '../../axiosInstance';
import { useHistory } from "react-router-dom";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const useStyles = makeStyles((theme) => ({
    form: {
        marginTop: "10%"
    },
    loginButton: {
        marginTop: theme.spacing(3)
    },
    login: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        backgroundColor: theme.palette.primary.main,
        margin: theme.spacing(3),
        padding: theme.spacing(3.5)
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
        axiosInstance.post("/login", {

            "username": userName,
            "password": passWord
        })
            .then(response => {

                // store the token if it exists into the local storage
                localStorage.setItem("accessToken", response.data.access_token);
                // go to base url after login
                history.push("/dashboard")

            }).catch((err) => {

                // error is thrown whenever wrong credentials are put
                if (err.response.status && err.response.status === 400) {

                    setFlag(true);

                } else {
                    console.log(err);
                }
            });

        event.preventDefault();
    }


    return (
        <Container maxWidth="xs" className={classes.form}>
            <div className={classes.login}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
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
                        onChange={event => setUserName(event.target.value)}
                        value={userName}
                        error={flag}
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
                        onChange={event => setPassWord(event.target.value)}
                        value={passWord}
                        error={flag}
                        helperText={flag && "Invalid credentials"}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={authenticate}
                        className={classes.loginButton}
                    >Sign in</Button>
                </form>
            </div>
        </Container>
    )
}

export default Login;