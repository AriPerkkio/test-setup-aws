import React, { Fragment } from 'react';

import SubmitButton from '../common/SubmitButton';

const preventEventSubmit = onSubmit => event => {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;

    onSubmit({ email, password });
};

const Login = ({
    onSubmit,
    isLoading,
    error
})  => {

    return (
        <Fragment>
            {error &&
                <div className='error'>
                    <pre>{JSON.stringify(error, null, 4)}</pre>
                </div>}

            <form
                onSubmit={preventEventSubmit(onSubmit)}
                className={`generic-form ${isLoading ? 'loading' : ''}`}>
                <input
                    type='text'
                    placeholder='Email'
                    disabled={isLoading}
                    className='form-control'/>

                <input
                    type='password'
                    placeholder='Password'
                    disabled={isLoading}
                    className='form-control'/>

                <SubmitButton
                    value='Login'
                    isLoading={isLoading} />
            </form>
        </Fragment>
    );
};

export default Login;