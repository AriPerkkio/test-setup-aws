import React, { Component } from 'react';

import Signup from './Signup';
import { verify, signup } from '../api/UserApi';

export default class SignupContainer extends Component {
    state = {
        isLoading: false,
        error: null,
        showVerify: false
    }

    setShowVerify = () => this.setState({ showVerify: true })
    setIsLoading = isLoading => this.setState({ isLoading })

    onError = error => this.setState({ error, isLoading: false })

    forwardToLogin = () => {
        this.setIsLoading(false);

        this.props.history.push("/login");
    }

    onVerify = ({ email, verificationCode }) => {
        this.setIsLoading(true);

        verify(email, verificationCode)
            .then(this.forwardToLogin)
            .catch(this.onError);
    }

    onSignup = ({ email, password }) => {
        this.setIsLoading(true);

        signup(email, password)
            .then(this.setShowVerify)
            .catch(this.onError);
    }

    render() {
        const { error, showVerify } = this.state;

        return (
            <Signup
                onSignUp={this.onSignup}
                onVerify={this.onVerify}
                error={error}
                showVerify={showVerify} />
        );
    }
}