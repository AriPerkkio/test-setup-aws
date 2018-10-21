import React, { Component, Fragment } from 'react';
import { CognitoUserPool } from 'amazon-cognito-identity-js';

import config from '../../api/cf-output';

const userPool = new CognitoUserPool({
    UserPoolId: config.UserPool,
    ClientId: config.UserPoolClient
});

class AuthenticationWrapper extends Component {
    state = {
        isAuthenticated: false
    }

    setIsAuthenticated = isAuthenticated => this.setState({ isAuthenticated })

    componentDidMount() {
        const { history, setAuthToken } = this.props;
        const user = userPool.getCurrentUser();

        if (user != null) {
            user.getSession((err, session) => {
                if (err || !session || !session.isValid()) {
                    history.push('/login');
                } else {
                    setAuthToken(session.getIdToken().jwtToken);
                    this.setIsAuthenticated(true);
                }
            });
        } else {
            history.push('/login');
        }
    }

    render() {
        if (!this.state.isAuthenticated) {
            return null;
        }

        return (
            <Fragment>
                {this.props.children}
            </Fragment>
        );
    }
}

// Hoc components which require authentication. If user is not authenticated, forward to /login
const withAuthentication = Component => ({ setAuthToken, history, ...props }) =>
    <AuthenticationWrapper {...{ setAuthToken, history }}>
        <Component {...{ history, ...props }} />
    </AuthenticationWrapper>;

const getAuthToken = () =>
    new Promise((resolve, reject) => {
        const user = userPool.getCurrentUser();

        user && user.getSession((err, session) => {
            if (err) return reject(err);

            resolve(session.getIdToken().jwtToken);
        });
    });

export {
    withAuthentication,
    getAuthToken
};