import React, { useState } from 'react';

import Login from './Login';
import { login } from '../../api/UserApi';

const LoginContainer = ({ history }) => {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const onSuccess = () => {
        setLoading(false);
        history.push('/auth-page');
    };

    const onError = e => {
        setLoading(false);
        setError(e);
    };

    const onSubmit = ({ email, password }) => {
        setLoading(true);

        login(email, password)
            .then(onSuccess)
            .catch(onError);
    };

    return (
        <Login {...{
            onSubmit,
            loading,
            error
        }} />
    );
};

export default LoginContainer;