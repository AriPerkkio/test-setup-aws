import { useState, useEffect, useContext } from 'react';

import { getAuthToken } from '../api/UserApi';
import { AuthContext } from '../context';

const useAuthentication = () => {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const { setAuthToken } = useContext(AuthContext);

    const onAuthFailure = () => { window.location.href = '#/login'; };
    const onAuthSuccess = authToken => {
        setAuthToken(authToken);
        setAuthenticated(true);
    };

    useEffect(() => {
        getAuthToken()
            .then(onAuthSuccess)
            .catch(onAuthFailure);
    }, []);

    return isAuthenticated;
};

export {
    useAuthentication
};