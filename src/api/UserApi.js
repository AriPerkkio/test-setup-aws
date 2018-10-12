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
        const attributeList = [ new CognitoUserAttribute({ Name: 'email', Value: email }) ];
        const handler = resultHandler(resolve, reject);

        userPool.signUp(email, password, attributeList, null, handler);
    });

const login = (email, password) =>
    new Promise((resolve, reject) => {
        const user = User(email);
        const loginData = LoginData(email, password);

        user.authenticateUser(loginData, {
            onFailure: reject,
            onSuccess: result => {
                const accessToken = result.getAccessToken().getJwtToken();
                const idToken = result.getIdToken().getJwtToken();

                resolve({ accessToken, idToken });
            },
        });
    });

export {
    signup,
    verify,
    login
};