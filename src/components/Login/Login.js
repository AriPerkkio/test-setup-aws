import React from 'react';

import UserForm, { UserFormInput } from '../common/UserForm';
import SubmitButton from '../common/SubmitButton';

const Login = ({
    onSubmit,
    loading,
    error
}) => {

    return (
        <UserForm {...{ onSubmit, loading, error }}>
            <UserFormInput name='Email' />
            <UserFormInput name='Password' />
            <SubmitButton text='Login' />
        </UserForm>
    );
};

export default Login;