import React from 'react';

import UserForm, { UserFormInput, UserFormSubmit } from '../../components/UserForm';
import { concatClasses } from '../../utils';

const BASE_CLASS = 'home';

const Home = ({
    className,
    onSubmit,
    formRef,
    state,
}) => {
    const classNames = concatClasses(BASE_CLASS, className);
    const { sending, error } = state;

    return (
        <div className={classNames}>
            Home

            <UserForm
                onSubmit={onSubmit}
                loading={sending}
                error={error}
                className={`${BASE_CLASS}--form`}
                ref={formRef}>

                <UserFormInput
                    className={`${BASE_CLASS}--input`}
                    name='Value'
                    type='number' />

                <UserFormInput
                    className={`${BASE_CLASS}--input`}
                    name='Unit' />

                <UserFormSubmit
                    className={`${BASE_CLASS}--submit`}
                    text='Upload data' />
            </UserForm>
        </div>
    );
};

export default Home;