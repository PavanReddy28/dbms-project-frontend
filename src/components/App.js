import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Login from "./Login"
import Register from "./Register"
import Header from "./Header"
import Footer from "./Footer"

function App() {
  return (
    <Router>
      <CssBaseline />
      <div>
        <Header />
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
