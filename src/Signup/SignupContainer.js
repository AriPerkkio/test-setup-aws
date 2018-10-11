import React, { Component } from 'react';

import Signup from './Signup';
import { verify, signup } from '../api/UserApi';

export default class SignupContainer extends Component {
    state = {
        email: '',
        password: '',
        verificationCode: '',
        isLoading: false,
        error: null,
        showVerify: false
    }

    setEmail = email => this.setState({ email })
    setPassword = password => this.setState({ password })
    setVerificationCode = verificationCode => this.setState({ verificationCode })
    setShowVerify = showVerify => this.setState({ showVerify })
    setIsLoading = isLoading => this.setState({ isLoading })

    onError = error => this.setState({
        error,
        isLoading: false
    });

    onVerify = () => {
        const { email, verificationCode } = this.state;

        this.setIsLoading(true);

        verify(email, verificationCode)
            .then(() => console.log('OK'))
            .catch(this.onError);
    }

    onSignup = () => {
        const { email, password } = this.state;

        this.setIsLoading(true);

        signup(email, password)
            .then(() => this.setShowVerify(true))
            .catch(this.onError);
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