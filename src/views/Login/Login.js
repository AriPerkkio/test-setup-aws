import React from 'react';

import UserForm, { UserFormInput, UserFormSubmit } from '../../components/UserForm';

const Login = ({
    className,
    onSubmit,
    loading,
    error
}) => {

    return (
        <UserForm {...{ className, onSubmit, loading, error }}>
            <UserFormInput name='Email' />
            <UserFormInput name='Password' />
            <UserFormSubmit text='Login' />
        </UserForm>
    );
};

export default Login;