import React, {useEffect, useState} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Login from "./Login"
import Register from "./Register"
import Header from "./Header"
// import Footer from "./Footer";
import CreateTourn from "./CreateTourn";
import Home from "./HomePage/Home";
import Dashboard from "./Dashboard";
import PrivateRoute from "../Private/PrivateRoute";
import TournSportReg from "./TournSportReg";
import provideTheme from "./Theme";
import Registrations from "./Registrations";
import ViewTourn from "./Tournament/ViewTourn";
import AuthTourn from "./Tournament/AuthTourn";
import { ThemeProvider } from "@material-ui/core/styles";
import AddMatch from "./Matches/AddMatch"


function App() {

  const [mode, setMode] = useState(localStorage.getItem("theme") !== null?localStorage.getItem("theme"):"dark");

  let theme = provideTheme(mode);

  useEffect(() => {
    //eslint-disable-next-line
    theme = provideTheme(mode);
    localStorage.setItem("theme",mode)
  },[mode])

  function toggleMode() {
    setMode(prev => {
      if(prev === "dark"){
        return "light";
      } else {
        return "dark";
      }
    })
  }

  return (

    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header mode = {mode} toggle = {toggleMode}/>

        <Switch>
          <Route exact path="/addMatch">
            <AddMatch/>
          </Route>
          <Route exact path="/tournSportReg">
            <TournSportReg/>
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/viewTourn/:tourn_id">
            <ViewTourn />
          </Route>
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
          <PrivateRoute exact path="/createTourn" component={CreateTourn} />
          <PrivateRoute exact path="/registrations" component = {Registrations} />
          <PrivateRoute exact path="/viewTourn/auth/:tourn_id" component={AuthTourn} />
        </Switch>

      </Router>

    </ThemeProvider>
  );
}

export default App;
