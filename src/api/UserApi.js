import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

import config from '../../api/cf-output';

const userPool = new CognitoUserPool({
    UserPoolId: config.UserPool,
    ClientId: config.UserPoolClient
});

const User = email => new CognitoUser({
    Username: email,
    Pool: userPool
});

const LoginData = (email, password) => new AuthenticationDetails({
    Username: email,
    Password: password
});

const resultHandler = (resolve, reject) =>
    (error, result) =>
        error ? reject(error) : resolve(result);

const verify = (email, verificationCode) =>
    new Promise((resolve, reject) => {
        const user = User(email);
        const handler = resultHandler(resolve, reject);

        user.confirmRegistration(verificationCode, true, handler);
    });

const signup = (email, password) =>
    new Promise((resolve, reject) => {
        const attributeList = [new CognitoUserAttribute({ Name: 'email', Value: email })];
        const handler = resultHandler(resolve, reject);

        userPool.signUp(email, password, attributeList, null, handler);
    });

const login = (email, password) =>
    new Promise((resolve, reject) => {
        const user = User(email);
        const loginData = LoginData(email, password);

        user.authenticateUser(loginData, {
            onFailure: reject,
            onSuccess: result => resolve(result.getIdToken().jwtToken)
        });
    });

const logout = () => userPool.getCurrentUser().signOut();

const isLoggedIn = () => userPool.getCurrentUser() != null;

const getAuthToken = () =>
    new Promise((resolve, reject) => {
        const user = userPool.getCurrentUser();

        if (user != null) {
            user.getSession((err, session) => {
                if (err || !session || !session.isValid()) {
                    reject();
                } else {
                    resolve(session.getIdToken().jwtToken);
                }
            });
        } else {
            reject();
        }
    });

export {
    signup,
    verify,
    login,
    logout,
    isLoggedIn,
    getAuthToken
};