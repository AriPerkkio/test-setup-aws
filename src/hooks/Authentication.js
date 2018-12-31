import { useEffect, useContext } from 'react';

import { getAuthToken } from '../api/UserApi';
import { AuthContext } from '../context';

const redirectToLogin = () => { window.location.href = '#/login'; };

/**
 * On component mount, check if user is authenticated. Set token into context
 * and return authentication status (same as in context, one source).
 * If user is not authenticated redirect to login page.
 */
const useAuthentication = () => {
    const { isAuthenticated, setAuthToken } = useContext(AuthContext);

    useEffect(() => {
        getAuthToken()
            .then(setAuthToken)
            .catch(redirectToLogin);
    }, []);

    return isAuthenticated;
};

export {
    useAuthentication
};