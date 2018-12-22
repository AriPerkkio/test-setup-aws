import React from 'react';

const BASE_CLASS = 'user-form-submit';

const SubmitButton = ({
    loading,
    className,
    text,
    ...props
}) => {
    const classNames = [
        BASE_CLASS,
        loading ? `${BASE_CLASS}--loading` : '',
        className,
    ].join(' ').trim();

    return (
        <button
            disabled={loading}
            className={classNames}
            {...props}>
            {text}
        </button>
    );
};

export default SubmitButton;