import React, { Component, createContext } from 'react';
import { getAuthToken } from '../api/UserApi';

const { Provider, Consumer } = createContext();

class ContextProvider extends Component {
    state = {
        authToken: null,
        setAuthToken: authToken => this.setState({ authToken }),
        ...this.props
    }

    componentDidMount() {
        getAuthToken()
            .then(this.state.setAuthToken);
    }

    render() {
        return (
            <Provider value={this.state}>
                {this.props.children}
            </Provider>
        );
    }
}

const withContext = Component => props =>
    <Consumer>
        {ctx => <Component { ...ctx } {...props} /> }
    </Consumer>;

export {
    ContextProvider,
    withContext
};