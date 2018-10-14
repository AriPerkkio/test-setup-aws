import React, { Component } from 'react';

import Login from './Login';
import { login } from '../../api/UserApi';
import { withContext } from '../../context';

class LoginContainer extends Component {
    state = {
        error: null,
        isLoading: false
    }

    setIsLoading = isLoading => this.setState({ isLoading })
    onError = error => this.setState({ error, isLoading: false })

    forwardToAuthPage = () => {
        this.setIsLoading(false);

        this.props.history.push('/auth-page');
    }

    onSubmit = ({email, password}) => {
        this.setIsLoading(true);

        login(email, password)
            .then(this.props.setAuthToken)
            .then(this.forwardToAuthPage)
            .catch(this.onError);
    }

    render() {
        const { isLoading, error } = this.state;

        return (
            <Login
                onSubmit={this.onSubmit}
                isLoading={isLoading}
                error={error} />
        );
    }
}

export default withContext(LoginContainer);