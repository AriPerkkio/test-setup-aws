import React, { memo } from 'react';

import { concatClasses } from '../../utils';

const BASE_CLASS = 'dashboard';

const DashBoard = memo(({
    className,
    data,
    loading,
    error,
}) => {
    const classNames = concatClasses(BASE_CLASS, className);

    return (
        <div className={classNames}>
            Dashboard

            <pre>
                {JSON.stringify({ data, loading, error, }, null, 4)}
            </pre>
        </div >
    );
});

export default DashBoard;