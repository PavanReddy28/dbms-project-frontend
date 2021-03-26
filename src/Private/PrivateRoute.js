import React, { useEffect, useState} from 'react';
import { Route, Redirect } from 'react-router-dom'
import {axiosInstance} from "../axiosInstance";
import Loading from "./Loading";


const PrivateRoute = ({ component: Component, ...rest }) => {

  const path = rest.path;
  console.log(path);
  
  const [isAuthenticated, setIsAuthenticated] = useState(null)  
  useEffect(() => {

    axiosInstance.get("/verify",{headers: {
      "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
  }} ).then(response => {
      setIsAuthenticated(true);
  })
  .catch(err => {
    setIsAuthenticated(false);
  })
    
    
  }, [])

  if(isAuthenticated === null){
    return <Loading />
  }

  return (
    <Route {...rest} render={props =>
      !isAuthenticated ? (
        <Redirect to='/login'/>
        // <Login/>
      ) : (
        <Component {...props} />
      )
    }
    />
  );
};

export default PrivateRoute;