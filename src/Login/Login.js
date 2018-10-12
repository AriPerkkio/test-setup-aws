import React, { Fragment } from 'react';

const preventEventSubmit = onSubmit => event => {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;

    onSubmit({ email, password });
};

const Login = ({
    onSubmit,
    error
})  => {

    return (
        <Fragment>
            {error && <pre>{JSON.stringify(error, null, 4)}</pre>}

            <form onSubmit={preventEventSubmit(onSubmit)} className='generic-form'>
                <input
                    type='text'
                    placeholder='Email'/>

                <input
                    type='password'
                    placeholder='Password'/>

                <input
                    type='submit'
                    text='Login' />
            </form>
        </Fragment>
    );
};

export default Login;