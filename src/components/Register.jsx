import React, { useState } from "react";
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { axiosInstance } from '../axiosInstance'

function Register() {

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
        <Container maxWidth="xs">
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
                    id="password"
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
                    id="password"
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