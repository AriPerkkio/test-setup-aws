import React from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';

import Signup from './Signup';
import Login from './Login';

const App = () => {
    return (
        <HashRouter>
            <Switch>
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <Route path="/some-page" component={() => <div>Logged in successfully</div>} />
                <Redirect to="/login" />
            </Switch>
        </HashRouter>
    );
};

export default App;