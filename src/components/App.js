import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Login"

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/login">
          <Login />

          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
