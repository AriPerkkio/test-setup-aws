import React from 'react';

import UserForm, { UserFormInput } from '../common/UserForm';
import SubmitButton from '../common/SubmitButton';

const Signup = ({
    onSignup,
    onVerify,
    loading,
    error,
    isVerifying
}) => {
    const onSubmit = isVerifying ?
        onVerify :
        onSignup;

    const buttonText = isVerifying ?
        'Verify' :
        'Signup';

    return (
        <UserForm {...{ onSubmit, loading, error }}>
            <UserFormInput name='Email' />

            {!isVerifying ?
                <UserFormInput name='Password' /> :
                <>
                    <UserFormInput name='Verification Code' />
                    <small>Verification code was sent to your email</small>
                </>}

            <SubmitButton text={buttonText} />
        </UserForm>
    );
};

export default Signup;