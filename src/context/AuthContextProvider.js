import React, {useState, useEffect ,createContext} from "react";


export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        setUser(true);
        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{
            loading,user
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider