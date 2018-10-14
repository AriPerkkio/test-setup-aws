import React, { Fragment } from 'react';

const SubmitButton = ({
    isLoading,
    className,
    ...props
}) => {
    return (
        <Fragment>
            <input
                id='submit'
                type='submit'
                disabled={isLoading}
                className={`btn btn-primary ${className ? className : ''}`}
                {...props} />

            <span className={isLoading ? 'loader' : ''} />
        </Fragment>
    );
};

export default SubmitButton;