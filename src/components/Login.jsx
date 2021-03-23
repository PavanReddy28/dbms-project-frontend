import React, {useState} from "react";
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {axiosInstance} from '../axiosInstance';
import {useHistory} from "react-router-dom";

function Login() {

    const history = useHistory();

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
            history.replace("/")

        }).catch((err) => {

            // error is thrown whenever wrong credentials are put
            if(err.response.status === 400){

                alert("wrong credentials");
            }
        });

        event.preventDefault();
    }


    return (
        <Container maxWidth="xs">
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