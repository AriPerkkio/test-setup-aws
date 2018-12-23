import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

import NavigationHeader from './components/NavigationHeader';
import Signup from './views/Signup';
import Login from './views/Login';
import Home from './views/Home';
import Dashboard from './views/Dashboard';
import { AuthContextProvider, ThemeContextProvider } from './context';

const App = () => {
    return (
        <HashRouter>
            <ThemeContextProvider>
                <NavigationHeader />
                <Switch>
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/login" component={Login} />

                    <Route path='/auth' render={({ match: { path: auth } }) =>
                        <AuthContextProvider>
                            <Switch>
                                <Route exact path={`${auth}(/home|/)`} component={Home} />
                                <Route exact path={`${auth}/dashboard`} component={Dashboard} />
                                <Redirect to={`${auth}/`} />
                            </Switch>
                        </AuthContextProvider>} />

                    <Redirect to={'/login'} />
                </Switch>
            </ThemeContextProvider>
        </HashRouter>
    );
};

export default App;