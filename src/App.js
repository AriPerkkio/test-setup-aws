import React, { Fragment } from 'react';
import { HashRouter, Route } from 'react-router-dom';

import NavigationHeader from './components/NavigationHeader';
import Signup from './components/Signup';
import Login from './components/Login';
import AuthPage from './components/AuthPage';
import { ContextProvider } from './context';

const App = () => {
    return (
        <ContextProvider>
            <HashRouter>
                <Fragment>
                    <NavigationHeader />
                    <Route path="/signup" component={Signup} />
                    <Route path="/login" component={Login} />
                    <Route path="(/auth-page|/)" component={AuthPage} />
                </Fragment>
            </HashRouter>
        </ContextProvider>
    );
};

export default App;