import React, { Fragment } from 'react';

import SubmitButton from '../common/SubmitButton';

const preventEventSubmit = onSubmit => event => {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;
    const verificationCode = event.target[2].value;

    onSubmit({ email, password, verificationCode });
};

const Signup = ({
    onSignup,
    onVerify,
    loading,
    error,
    showVerify
}) => {
    const onSubmit = showVerify ?
        onVerify :
        onSignup;

    const buttonText = showVerify ?
        'Verify' :
        'Signup';

    return (
        <Fragment>
            {error &&
                <div className='error'>
                    <pre>{JSON.stringify(error, null, 4)}</pre>
                </div>}

            <form onSubmit={preventEventSubmit(onSubmit)}
                className={`generic-form ${loading ? 'loading' : ''}`}>
                <input
                    type='text'
                    placeholder='Email'
                    className='form-control'
                    disabled={showVerify} />

                <input
                    type='password'
                    placeholder='Password'
                    className='form-control'
                    style={{ display: showVerify ? 'none' : 'block' }} />

                <input
                    type='text'
                    placeholder='Verification code'
                    className='form-control'
                    style={{ display: showVerify ? 'block' : 'none' }} />

                <small
                    className='form-text text-muted'
                    style={{ display: showVerify ? 'block' : 'none' }}>
                    Verification code was sent to your email
                </small>

                <SubmitButton
                    text={buttonText}
                    loading={loading} />
            </form>
        </Fragment>
    );
};

export default Signup;