import React, { lazy, Suspense } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

import NavigationHeader from './components/NavigationHeader';
import { AuthContextProvider, ThemeContextProvider } from './context';
import { Authenticator } from './utils';

const Signup = lazy(() => import(/* webpackChunkName: "signup" */ './views/Signup'));
const Login = lazy(() => import(/* webpackChunkName: "login" */ './views/Login'));
const Home = lazy(() => import(/* webpackChunkName: "home" */ './views/Home'));
const Dashboard = lazy(() => import(/* webpackChunkName: "dashboard" */ './views/Dashboard'));

const App = () => {
    return (
        <HashRouter>
            <ThemeContextProvider>
                <AuthContextProvider>
                    <NavigationHeader />
                    <Suspense fallback={<div />}>
                        <Switch>
                            <Route exact path="/signup" component={Signup} />
                            <Route exact path="/login" component={Login} />

                            {/* Routes requiring authentication */}
                            <Route path='/auth' render={({ match: { path: auth } }) =>
                                <Authenticator>
                                    <Switch>
                                        <Route exact path={`${auth}(/home|/)`} component={Home} />
                                        <Route exact path={`${auth}/dashboard`} component={Dashboard} />
                                        <Redirect to={`${auth}/`} />
                                    </Switch>
                                </Authenticator>} />

                            <Redirect to={'/login'} />
                        </Switch>
                    </Suspense>
                </AuthContextProvider>
            </ThemeContextProvider>
        </HashRouter>
    );
};

export default App;