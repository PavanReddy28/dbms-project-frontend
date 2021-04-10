import React, { useState } from "react";
import {Container, TextField, Button, Typography, makeStyles} from '@material-ui/core'
import { axiosInstance } from '../../axiosInstance';


const useStyles = makeStyles((theme) => ({
    form: {
        marginTop: "10%"
    }
}));


function Register() {

    const classes = useStyles();

    const [userName, setUserName] = useState("");
    const [passWord, setPassWord] = useState("");
    const [confirmPassWord, setConfirmPassWord] = useState("");
    const [validate, setValidate] = useState(true);

    function authenticate(event) {
        if (confirmPassWord === passWord) {
            setValidate(true);

            axiosInstance.post("/register", {
                "username": userName,
                "password": passWord
            }).then(response => alert("user registered"))
                .catch((err) => console.log(err))
        } else {
            setValidate(false);
        }
        event.preventDefault()
    }


    return (
        <Container maxWidth="xs" className = {classes.form}>
            <Typography component="h1" variant="h5">
                Sign Up!
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
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    onChange={event => setPassWord(event.target.value)}
                    value={passWord}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="confirm-password"
                    label="Confirm Password"
                    type="password"
                    onChange={event => setConfirmPassWord(event.target.value)}
                    value={confirmPassWord}
                    error={!validate}
                    helperText={!validate && "Passwords do not match"}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={authenticate}
                >Register Account</Button>
            </form>
        </Container>
    )
}

export default Register;