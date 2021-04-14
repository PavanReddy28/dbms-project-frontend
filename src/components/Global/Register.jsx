import React, { useState } from "react";
import { Container, TextField, Button, Typography, makeStyles, Avatar, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { axiosInstance } from '../../axiosInstance';
import { useHistory } from "react-router-dom";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';


const useStyles = makeStyles((theme) => ({
    form: {
        marginTop: "10%"
    },
    registerButton: {
        marginTop: theme.spacing(3)
    },
    register: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        backgroundColor: theme.palette.primary.main,
        margin: theme.spacing(3),
        padding: theme.spacing(3.5)
    }
}));


function Register() {

    const history = useHistory();

    const classes = useStyles();

    const [userName, setUserName] = useState("");
    const [passWord, setPassWord] = useState("");
    const [confirmPassWord, setConfirmPassWord] = useState("");
    const [validate, setValidate] = useState(true);
    const [open, setOpen] = useState(false);

    function authenticate(event) {
        if (confirmPassWord === passWord) {
            setValidate(true);

            axiosInstance.post("/register", {
                "username": userName,
                "password": passWord
            }).then(response => {

                setOpen(true)
                setTimeout(() => { history.push("/login") }, 1000)

            })
                .catch((err) => console.log(err))
        } else {
            setValidate(false);
        }
        event.preventDefault()
    }

    function handleClose() {

    }


    return (
        <>
            <Container maxWidth="xs" className={classes.form}>
                <div className={classes.register}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
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
                            className={classes.registerButton}
                        >Register Account</Button>
                    </form>
                </div>
            </Container>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Successfully Registered. Redirecting...
                </Alert>
            </Snackbar>
        </>
    )
}

export default Register;