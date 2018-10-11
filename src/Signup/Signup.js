import React, { Fragment } from 'react';

const preventEventSubmit = onSubmit => event => {
    event.preventDefault();
    onSubmit();
};

const Signup = ({
    email,
    password,
    verificationCode,
    onEmailChange,
    onPasswordChange,
    onVerificationCodeChange,
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

    const verificationAttributes = {
        type: 'text',
        placeholder: 'Verification code',
        value: verificationCode,
        onChange: ({ target: { value }}) => onVerificationCodeChange(value)
    };

    const passwordAttributes = {
        type: 'password',
        value: password,
        placeholder: 'Password',
        onChange: ( { target: { value }}) => onPasswordChange(value.trim())
    };

    return (
        <Fragment>
            {error &&
                <pre>{`Error: ${JSON.stringify(error, null, 4)}`}</pre>}

            <form onSubmit={preventEventSubmit(onSubmit)} className='signup-form'>
                <fieldset>
                    <input
                        type="text"
                        value={email}
                        placeholder="Email"
                        disabled={showVerify}
                        onChange={( { target: { value }}) => onEmailChange(value.trim())}/>

                    {showVerify ?
                        <input { ...verificationAttributes } /> :
                        <input { ...passwordAttributes }/> }

                    <input type="submit" text={buttonText} />
                </fieldset>
            </form>
        </Fragment>
    );
};

export default Signup;