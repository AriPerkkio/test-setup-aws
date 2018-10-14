import React, { Component } from 'react';

import Signup from './Signup';
import { verify, signup } from '../../api/UserApi';

export default class SignupContainer extends Component {
    state = {
        isLoading: false,
        error: null,
        showVerify: false
    }

    setIsLoading = isLoading => this.setState({ isLoading })
    setShowVerify = () => this.setState({ showVerify: true, isLoading: false })
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
        const { isLoading, error, showVerify } = this.state;

        return (
            <Signup
                onSignUp={this.onSignup}
                onVerify={this.onVerify}
                isLoading={isLoading}
                error={error}
                showVerify={showVerify} />
        );
    }
}