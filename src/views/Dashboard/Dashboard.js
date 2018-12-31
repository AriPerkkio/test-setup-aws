import React from 'react';

import { concatClasses } from '../../utils';

const BASE_CLASS = 'dashboard';

const DashBoard = ({
    className,
    data,
    loading,
    error
}) => {
    const classNames = concatClasses(BASE_CLASS, className);

    return (
        <div className={classNames}>
            Dashboard
        </div>
    );
};

export default DashBoard;