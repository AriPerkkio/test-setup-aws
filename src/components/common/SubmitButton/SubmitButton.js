import React from 'react';

const SubmitButton = ({
    loading,
    className,
    text,
    ...props
}) => {
    const classNames = [
        'btn btn-primary', // Bootstrap
        'btn-submit',
        loading ? 'btn-submit--loading' : '',
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