import React, { Component } from 'react';
import { CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';

import config from '../../api/cf-output';

const userPool = new CognitoUserPool({
    UserPoolId: config.UserPool,
    ClientId: config.UserPoolClient
});

export default class Signup extends Component {
    state = {
        email: '',
        password: ''
    }

    setEmail = email => this.setState({ email })
    setPassword = password => this.setState({ password })

    onSubmit = event => {
        event.preventDefault();
        const { email, password } = this.state;
        const { onSuccess, onError } = this.props;

        const attributeList = [
            new CognitoUserAttribute({
                Name: 'email',
                Value: email
            })
        ];

        userPool.signUp(email, password, attributeList, null, (error, result) => {
            if(error) {
                return onError(error);
            }

            onSuccess(result);
        });
    }

    render() {
        const { email, password } = this.state;

        return (
            <form onSubmit={this.onSubmit}>
                <input type="text"
                       value={email}
                       placeholder="Email"
                       onChange={( { target: { value }}) => this.setEmail(value.trim())}/>
                <input type="password"
                       value={password}
                       placeholder="Password"
                       onChange={( { target: { value }}) => this.setPassword(value.trim())}/>
                <input type="submit"/>
            </form>
        )
    }
}