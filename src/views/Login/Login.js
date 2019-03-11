import React from 'react';

import UserForm, {
    UserFormInput,
    UserFormSubmit,
} from '../../components/UserForm';
import { concatClasses } from '../../utils';

const BASE_CLASS = 'login';

const Login = ({ className, onSubmit, loading, error }) => {
    const classNames = concatClasses(BASE_CLASS, className);

    return (
        <UserForm {...{ className: classNames, onSubmit, loading, error }}>
            <UserFormInput name='Email' />
            <UserFormInput name='Password' />
            <UserFormSubmit text='Login' />
        </UserForm>
    );
};

export default Login;
