import React, { Fragment } from 'react';

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

    return (
        <Fragment>
            {error &&
                <pre>{`Error: ${JSON.stringify(error, null, 4)}`}</pre>}

            <form onSubmit={onSignUp}>
                <fieldset disabled={showVerify}>
                    <input type="text"
                           value={email}
                           placeholder="Email"
                           onChange={( { target: { value }}) => onEmailChange(value.trim())}/>
                    <input type="password"
                           value={password}
                           placeholder="Password"
                           onChange={( { target: { value }}) => onPasswordChange(value.trim())}/>
                    <input type="submit"/>
                </fieldset>
            </form>

            {showVerify &&
                <form onSubmit={onVerify}>
                    <input
                        type='text'
                        placeholder='Verification code'
                        value={verificationCode}
                        onChange={({ target: { value }}) => onVerificationCodeChange(value)} />
                    <input
                        type='submit'
                        text='Verify' />
                </form> }
        </Fragment>
    );
};

export default Signup;