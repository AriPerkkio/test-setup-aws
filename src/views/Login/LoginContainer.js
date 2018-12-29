import React, { useState, useEffect } from 'react';

import Login from './Login';
import { login, isLoggedIn } from '../../api/UserApi';
import { useFadeIn } from '../../hooks';

const LoginContainer = ({ history }) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const className = useFadeIn();

    useEffect(() => {
        if (isLoggedIn()) {
            history.push('/auth');
        }
    }, []);

    const onSuccess = () => {
        setLoading(false);
        setError(null);
        history.push('/auth');
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