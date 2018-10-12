import React, { Component } from 'react';

import Login from './Login';
import { login } from '../api/UserApi';

export default class LoginContainer extends Component {
    state = {
        error: null,
        isLoading: false
    }

    setIsLoading = isLoading => this.setState({ isLoading })
    onError = error => this.setState({ error, isLoading: false })

    forwardToSomewhere = () => {
        this.setIsLoading(false);

        this.props.history.push('/some-page');
    }

    onSubmit = ({email, password}) => {
        this.setIsLoading(true);

        login(email, password)
            .then(this.forwardToSomewhere)
            .catch(this.onError);
    }

    render() {
        const { error } = this.state;

        return (
            <Login
                onSubmit={this.onSubmit}
                error={error} />
        );
    }
}
