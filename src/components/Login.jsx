import React, {useState} from "react";
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

function Login() {

    const [userName, setUserName] = useState("");
    const [passWord, setPassWord] = useState("");


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
                >Sign in</Button>
            </form>
        </Container>
    )
}

export default Login;