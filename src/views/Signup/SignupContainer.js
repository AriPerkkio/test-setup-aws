import React, { useState } from 'react';

import Signup from './Signup';
import { verify, signup } from '../../api/UserApi';
import { useFadeIn } from '../../hooks';

const SignupContainer = ({ history }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isVerifying, setIsVerifying] = useState(false);
    const className = useFadeIn();

    const onSignupSuccess = () => {
        setLoading(false);
        setError(null);
        setIsVerifying(true);
    };

    const onError = e => {
        setLoading(false);
        setError(e);
    };

    const onVerifySuccess = () => {
        setLoading(false);
        setError(null);
        history.push('/login');
    };

    const onVerify = ({ email, verificationCode }) => {
        setLoading(true);

        verify(email, verificationCode)
            .then(onVerifySuccess)
            .catch(onError);
    };

    const onSignup = ({ email, password }) => {
        setLoading(true);

        signup(email, password)
            .then(onSignupSuccess)
            .catch(onError);
    };

    return (
        <Signup {...{
            className,
            onSignup,
            onVerify,
            loading,
            error,
            isVerifying,
        }} />
    );
};

export default SignupContainer;