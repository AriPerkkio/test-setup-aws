import React, { memo } from 'react';

import UserForm, { UserFormInput, UserFormSubmit } from '../../components/UserForm';
import { concatClasses } from '../../utils';

const BASE_CLASS = 'home';

const Home = memo(({
    className,
    onSubmit,
    formRef,
    sending,
    error,
}) => {
    const classNames = concatClasses(BASE_CLASS, className);

    return (
        <div className={classNames}>
            Home

            <UserForm
                onSubmit={onSubmit}
                loading={sending}
                error={error}
                className={`${BASE_CLASS}-form`}
                ref={formRef}>

                <UserFormInput
                    className={`${BASE_CLASS}-input`}
                    name='Value'
                    type='number' />

                <UserFormInput
                    className={`${BASE_CLASS}-input`}
                    name='Unit' />

                <UserFormSubmit
                    className={`${BASE_CLASS}-submit`}
                    text='Upload data' />
            </UserForm>
        </div>
    );
});

export default Home;