import React from 'react';

import UserForm, { UserFormInput, UserFormSubmit } from '../../components/UserForm';

const Login = ({
    onSubmit,
    loading,
    error
}) => {

    return (
        <UserForm {...{ onSubmit, loading, error }}>
            <UserFormInput name='Email' />
            <UserFormInput name='Password' />
            <UserFormSubmit text='Login' />
        </UserForm>
    );
};

export default Login;