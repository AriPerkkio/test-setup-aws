import React, { Component, createContext } from 'react';

const { Provider, Consumer } = createContext();

class ContextProvider extends Component {
    state = {
        authToken: null,
        setAuthToken: authToken => this.setState({ authToken }),
        ...this.props
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