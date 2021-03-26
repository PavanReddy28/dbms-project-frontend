import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Login from "./Login"
import Register from "./Register"
import Header from "./Header"
import Footer from "./Footer";
import Home from "./Home";
import DashBoard from "./DashBoard";
import AuthContextProvider from "../context/AuthContextProvider";


function App() {
  return (
    // <Router>
    //   <CssBaseline />
    //   <div>
    //     <Header />
    //     <Switch>
    //       <Route exact path="/login">
    //         <Login />
    //       </Route>
    //       <Route exact path="/register">
    //         <Register />
    //       </Route>
    //       <Route exact path="/">
    //         <Home />
    //       </Route>
    //     </Switch>
    //     <Footer />
    //   </div>
    // </Router>
    <AuthContextProvider>
      <BrowserRouter>
        <CssBaseline />
        <Header />
        <Route exact path="/login">
             <Login />
           </Route>
           <Route exact path="/register">
             <Register />
           </Route>
           <Route exact path="/">
             <Home />
           </Route>
           <Route exact path="/dashboard">
             <DashBoard />
           </Route>
        <Footer />
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
