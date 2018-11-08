import React, { Component, createContext } from 'react';

const { Provider, Consumer } = createContext();

class ContextProvider extends Component {
    state = {
        authToken: null,
        ...this.props
    }

    setAuthToken = authToken => this.setState({ authToken })

    render() {
        const context = {
            ...this.state,
            setAuthToken: this.setAuthToken
        };

        return (
            <Provider value={context}>
                {this.props.children}
            </Provider>
        );
    }
}

const withContext = Component => props =>
    <Consumer>
        {ctx => <Component {...ctx} {...props} />}
    </Consumer>;

export {
    ContextProvider,
    withContext
};