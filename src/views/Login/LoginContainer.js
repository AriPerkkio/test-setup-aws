import React, { useState } from 'react';

import Login from './Login';
import { login } from '../../api/UserApi';
import { useFadeIn } from '../../hooks';

const LoginContainer = ({ history }) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const className = useFadeIn();

    const onSuccess = () => {
        setLoading(false);
        setError(null);
        history.push('/auth/home');
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
            className,
            onSubmit,
            loading,
            error
        }} />
    );
};

export default LoginContainer;