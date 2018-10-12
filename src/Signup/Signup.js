import React, { Fragment } from 'react';

const preventEventSubmit = onSubmit => event => {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;
    const verificationCode = event.target[2].value;

    onSubmit({ email, password, verificationCode });
};

const Signup = ({
    onSignUp,
    onVerify,
    error,
    showVerify
}) => {
    const onSubmit = showVerify ?
        onVerify :
        onSignUp;

    const buttonText = showVerify ?
        'Verify' :
        'Signup';

    return (
        <Fragment>
            {error &&
                <pre>{`Error: ${JSON.stringify(error, null, 4)}`}</pre>}

            <form onSubmit={preventEventSubmit(onSubmit)} className='generic-form'>
                <input
                    type='text'
                    placeholder='Email'
                    disabled={showVerify}/>

                <input
                    type='password'
                    placeholder='Password'
                    style={{ display: showVerify ? 'none' : 'block' }}/>

                <input
                    type='text'
                    placeholder='Verification code'
                    style={{ display: showVerify ? 'block' : 'none' }} />

                <input type='submit' text={buttonText} />
            </form>
        </Fragment>
    );
};

export default Signup;