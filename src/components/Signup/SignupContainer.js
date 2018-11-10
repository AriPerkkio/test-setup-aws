import React, { useState } from 'react';

import Signup from './Signup';
import { verify, signup } from '../../api/UserApi';

const SignupContainer = ({ history }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showVerify, setShowVerify] = useState(false);


    const onSignupSuccess = () => {
        setLoading(false);
        setShowVerify(true);
    };

    const onError = e => {
        setLoading(false);
        setError(e);
    };

    const onVerifySuccess = () => {
        setLoading(false);
        history.push("/login");
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
            onSignup,
            onVerify,
            loading,
            error,
            showVerify
        }} />
    );
};

export default SignupContainer;