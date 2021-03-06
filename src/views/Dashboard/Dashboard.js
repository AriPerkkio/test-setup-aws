import React, { memo } from 'react';

import Graph from '../../components/Graph';
import UserForm, {
    UserFormInput,
    UserFormSubmit,
} from '../../components/UserForm';
import Loader from '../../components/Loader';
import { concatClasses } from '../../utils';

const BASE_CLASS = 'dashboard';

const DashBoard = memo(
    ({ className, onSubmit, data, loading, sending, formRef, error }) => {
        const classNames = concatClasses(BASE_CLASS, className);

        return (
            <div className={classNames}>
                {loading && <Loader />}

                <Graph className={`${BASE_CLASS}-graph`} data={data} />

                <UserForm
                    onSubmit={onSubmit}
                    loading={sending}
                    error={error}
                    className={`${BASE_CLASS}-form`}
                    ref={formRef}>
                    <UserFormInput
                        className={`${BASE_CLASS}-input`}
                        name='Value'
                        type='number'
                    />

                    <UserFormInput
                        className={`${BASE_CLASS}-input`}
                        name='Unit'
                    />

                    <UserFormInput
                        className={`${BASE_CLASS}-input`}
                        name='Label'
                    />

                    <UserFormInput
                        className={`${BASE_CLASS}-input`}
                        placeholder='Time YYYY-MM-DD'
                        name='Time'
                    />

                    <UserFormSubmit
                        className={`${BASE_CLASS}-submit`}
                        text='Upload data'
                    />
                </UserForm>
            </div>
        );
    }
);

export default DashBoard;
