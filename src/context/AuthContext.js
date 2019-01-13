import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthContextProvider = ({
    children,
}) => {
    const [authToken, setAuthToken] = useState(null);

    const context = {
        setAuthToken,
        authToken,
        isAuthenticated: authToken != null,
    };

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    );
};

export {
    AuthContext,
    AuthContextProvider,
};