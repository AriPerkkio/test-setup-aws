import React from 'react';

import { concatClasses } from '../../utils';

const BASE_CLASS = 'user-form-input';
const TYPES = ['email', 'password'];

const UserFormInput = ({
    name,
    className,
    loading,
    ...props
}) => {
    const id = name.replace(' ', '-').toLowerCase();
    const type = TYPES.includes(id) ? id : 'text';

    const classNames = concatClasses(
        BASE_CLASS,
        className,
        loading && `${BASE_CLASS}--loading`,
    );

    return (
        <>
            <input {...props}
                className={classNames}
                name={name}
                id={id}
                type={type}
                placeholder={name}
                disabled={loading} />

            <label
                htmlFor={id}
                className={`${BASE_CLASS}--label`}>
                {name}
            </label>
        </>
    );
};

export default UserFormInput;