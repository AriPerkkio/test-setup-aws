import React from 'react';

import UserForm, { UserFormInput, UserFormSubmit } from '../../components/UserForm';
import { concatClasses } from '../../utils';

const BASE_CLASS = 'signup';

const Signup = ({
    className: classNameProp,
    onSignup,
    onVerify,
    loading,
    error,
    isVerifying
}) => {
    const className = concatClasses(BASE_CLASS, classNameProp);

    const onSubmit = isVerifying ?
        onVerify :
        onSignup;

    const buttonText = isVerifying ?
        'Verify' :
        'Signup';

    return (
        <UserForm {...{ className, onSubmit, loading, error }}>
            <UserFormInput name='Email' />

            {!isVerifying ?
                <UserFormInput name='Password' /> :
                <>
                    <UserFormInput name='Verification Code' />
                    <label className={`${BASE_CLASS}--verify-label`}>
                        Verification code was sent to your email
                    </label>
                </>}

            <UserFormSubmit text={buttonText} />
        </UserForm>
    );
};

export default Signup;