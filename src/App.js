import React, { lazy, Suspense } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

import NavigationHeader from './components/NavigationHeader';
import { AuthContextProvider, ThemeContextProvider, DataContextProvider } from './context';
import { reducer, initialState } from './reducers';
import { Authenticator } from './utils';

const Signup = lazy(() => import(/* webpackChunkName: "signup" */ './views/Signup'));
const Login = lazy(() => import(/* webpackChunkName: "login" */ './views/Login'));
const Home = lazy(() => import(/* webpackChunkName: "home" */ './views/Home'));
const Dashboard = lazy(() => import(/* webpackChunkName: "dashboard" */ './views/Dashboard'));

const App = () => {
    return (
        <RootContext>
            <NavigationHeader />
            <Suspense fallback={<div />}>
                <Switch>
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="(/login|/)" component={Login} />
                    <AuthenticatedRoutes />
                    <Redirect to={'/'} />
                </Switch>
            </Suspense>
        </RootContext>
    );
};

const RootContext = ({ children }) =>
    <HashRouter>
        <ThemeContextProvider>
            <AuthContextProvider>
                {children}
            </AuthContextProvider>
        </ThemeContextProvider>
    </HashRouter>;

const AuthenticatedRoutes = () =>
    <Route path='/auth' render={({ match: { path: auth } }) =>
        <Authenticator>
            <DataContextProvider {...{ reducer, initialState }}>
                <Switch>
                    <Route exact path={`${auth}(/home|/)`} component={Home} />
                    <Route exact path={`${auth}/dashboard`} component={Dashboard} />
                    <Redirect to={`${auth}/`} />
                </Switch>
            </DataContextProvider>
        </Authenticator>} />;


export default App;