import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Login"
import Register from "./Register"

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/login">
          <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
