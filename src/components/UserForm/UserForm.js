import React, { Children, cloneElement } from 'react';

import { concatClasses } from '../../utils';

const BASE_CLASS = 'user-form';

const UserForm = ({
    onSubmit,
    error,
    className,
    loading,
    children,
    ...props
}) => {
    const classNames = concatClasses(
        BASE_CLASS,
        className,
        loading && `${BASE_CLASS}--loading`);

    return (
        <form {...props}
            onSubmit={preventEventSubmit(onSubmit)}
            className={classNames}>

            {Children.map(children, child =>
                cloneElement(child, { loading }))}

            {error &&
                <div className={`${BASE_CLASS}--errors`}>
                    Error: {error.message}
                </div>}

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
        data[toLowerCamelCase(input.name)] = input.value;
    }

    return data;
};

const toLowerCamelCase = name => {
    const first = name.charAt(0).toLowerCase();
    const rest = name.slice(1).split(' ').join('');

    return first + rest;
};

export default UserForm;