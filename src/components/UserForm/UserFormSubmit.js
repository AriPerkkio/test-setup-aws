import React from 'react';

import { concatClasses } from '../../utils';

const BASE_CLASS = 'user-form-submit';

const SubmitButton = ({ loading, className, text, ...props }) => {
    const classNames = concatClasses(
        BASE_CLASS,
        loading && `${BASE_CLASS}--loading`,
        className
    );

    return (
        <button disabled={loading} className={classNames} {...props}>
            {text}
        </button>
    );
};

export default SubmitButton;
