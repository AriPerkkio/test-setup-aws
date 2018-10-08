import React, { Component } from 'react';
import { CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';

import Signup from './Signup';
import config from '../../api/cf-output';

const userPool = new CognitoUserPool({
    UserPoolId: config.UserPool,
    ClientId: config.UserPoolClient
});

export default class SignupContainer extends Component {
    state = {
        email: '',
        password: '',
        verificationCode: '',
        error: null,
        showVerify: false
    }

    setEmail = email => this.setState({ email })
    setPassword = password => this.setState({ password })
    setVerificationCode = verificationCode => this.setState({ verificationCode })
    setError = error => this.setState({ error })
    setShowVerify = showVerify => this.setState({ showVerify })

    onVerify = event => {
        event.preventDefault();
        const { email, verificationCode } = this.state;

        const user = new CognitoUser({
            Username: email,
            Pool: userPool
        });

        user.confirmRegistration(verificationCode, true, (err, result) => {
            if(err) {
                return this.setError(err);
            }

            console.log(result);
        });
    }

    onSignup = event => {
        event.preventDefault();
        const { email, password } = this.state;

        const attributeList = [
            new CognitoUserAttribute({
                Name: 'email',
                Value: email
            })
        ];

        userPool.signUp(email, password, attributeList, null, error => {
            if(error) {
                return this.setError(error);
            }

            this.setShowVerify(true);

        });
    }

    render() {
        const { email, password, verificationCode, error, showVerify } = this.state;

        return (
            <Signup
                email={email}
                password={password}
                verificationCode={verificationCode}
                onEmailChange={this.setEmail}
                onPasswordChange={this.setPassword}
                onVerificationCodeChange={this.setVerificationCode}
                onSignUp={this.onSignup}
                onVerify={this.onVerify}
                error={error}
                showVerify={showVerify} />
        );
    }
}