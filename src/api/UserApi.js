import { CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';

import config from '../../api/cf-output';

const userPool = new CognitoUserPool({
    UserPoolId: config.UserPool,
    ClientId: config.UserPoolClient
});

const User = email => new CognitoUser({
    Username: email,
    Pool: userPool
});

const verify = (email, verificationCode) =>
    new Promise((resolve, reject) => {
        const user = User(email);

        user.confirmRegistration(verificationCode, true, (err, result) => {
            if(err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });

const signup = (email, password) =>
    new Promise((resolve, reject) => {
        const attributeList = [
            new CognitoUserAttribute({ Name: 'email', Value: email })
        ];

        userPool.signUp(email, password, attributeList, null, (error, result) => {
            if(error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });

export {
    signup,
    verify
};