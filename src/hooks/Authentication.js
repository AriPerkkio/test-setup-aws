import { useState, useEffect, useContext } from 'react';
import { CognitoUserPool } from 'amazon-cognito-identity-js';

import { AuthContext } from '../context';
import config from '../../api/cf-output';

const userPool = new CognitoUserPool({
    UserPoolId: config.UserPool,
    ClientId: config.UserPoolClient
});

const useAuthentication = (history) => {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const { setAuthToken } = useContext(AuthContext);

    const checkAuthentication = () => {
        const user = userPool.getCurrentUser();

        if (user != null) {
            user.getSession((err, session) => {
                if (err || !session || !session.isValid()) {
                    history && history.push('/login');
                } else {
                    setAuthToken(session.getIdToken().jwtToken);
                    setAuthenticated(true);
                }
            });
        } else {
            history && history.push('/login');
        }
    };

    useEffect(checkAuthentication, [isAuthenticated]);

    return isAuthenticated;
};

export {
    useAuthentication
};