import React, { Children, cloneElement } from 'react';

const BASE_CLASS = 'user-form';

const UserForm = ({
    onSubmit,
    className,
    loading,
    children,
    ...props
}) => {
    const classNames = [
        BASE_CLASS,
        className ? className : '',
        loading ? `${BASE_CLASS}--loading` : ''
    ].join(' ').trim();

    return (
        <form {...props}
            onSubmit={preventEventSubmit(onSubmit)}
            className={classNames}>

            {Children.map(children, child =>
                cloneElement(child, { loading }))}

        </form>
    );
};

const preventEventSubmit = onSubmit => event => {
    event.preventDefault();

    const data = Array.from(event.target)
        .reduce(formInputReducer, {});

    onSubmit(data);
};

const formInputReducer = (data, input) => {
    if (input.name && input.value) {
        data[nameToCamelCase(input.name)] = input.value;
    }

    return data;
};

const nameToCamelCase = name => {
    const first = name.charAt(0).toLowerCase();
    const rest = name.slice(1).split(' ').join('');

    return first + rest;
};

export default UserForm;