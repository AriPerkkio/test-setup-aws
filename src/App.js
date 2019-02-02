import React, { lazy, Suspense } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

import NavigationHeader from './components/NavigationHeader';
import Loader from './components/Loader';
import { AuthContextProvider, ThemeContextProvider, DataContextProvider } from './context';
import { reducer, initialState } from './reducers';
import { Authenticator } from './utils';

const Signup = lazy(() => import(/* webpackChunkName: "signup" */ './views/Signup'));
const Login = lazy(() => import(/* webpackChunkName: "login" */ './views/Login'));
const Home = lazy(() => import(/* webpackChunkName: "home" */ './views/Home'));
const Dashboard = lazy(() => import(/* webpackChunkName: "dashboard" */ './views/Dashboard'));
const Playground = lazy(() => import(/* webpackChunkName: "playground" */ './views/Playground'));

const App = () => {
    return (
        <RootContext>
            <NavigationHeader />
            <Suspense fallback={<Loader />}>
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
                    <Route exact path={`${auth}/playground`} component={Playground} />
                    <Redirect to={`${auth}/`} />
                </Switch>
            </DataContextProvider>
        </Authenticator>} />;

export default App;