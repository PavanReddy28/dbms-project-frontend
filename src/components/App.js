import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Login from "./Login"
import Register from "./Register"
import Header from "./Header"
import Footer from "./Footer";
import Home from "./Home"
import CreateTourn from "./CreateTourn";

function App() {
  return (
    <Router>
      <CssBaseline />
      <div>
        <Header />
        <Switch>
          <Route exact path="/createTourn">
            <CreateTourn />
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
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
