import React, {useContext, useEffect} from "react";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContextProvider";

const DashBoard = () => {
    const {user, loading} = useContext(AuthContext);
    const history = useHistory();

    alert(user);
    alert(loading);

    useEffect(() => {
        if (!user && !loading){
            return history.replace("/login");
        }
    },[history, user, loading]);

    if (loading && !user) {
        return <p>...Loading</p>;
    }

    return(
        <div>
            <h1>
                Welcome to dashboard
            </h1>
        </div>
    )
};

export default DashBoard