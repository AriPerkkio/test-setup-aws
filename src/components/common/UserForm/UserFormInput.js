import React from 'react';

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

    const classNames = [
        BASE_CLASS,
        className ? className : '',
        loading ? `${BASE_CLASS}--loading` : ''
    ].join(' ').trim();

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