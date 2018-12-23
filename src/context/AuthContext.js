import React, { createContext, useState, createElement } from 'react';

import { useAuthentication } from '../hooks';

const AuthContext = createContext();

const AuthContextProvider = ({
    children
}) => {
    const [authToken, setAuthToken] = useState(null);

    const context = {
        setAuthToken,
        authToken
    };

    return (
        <AuthContext.Provider value={context}>
            {React.Children.map(children, child =>
                createElement(AuthChildren, { children: child }))}
        </AuthContext.Provider>
    );
};

const AuthChildren = ({ children }) => {
    const isAuthenticated = useAuthentication();

    if (!isAuthenticated) return null;

    return children;
};

export {
    AuthContext,
    AuthContextProvider
};