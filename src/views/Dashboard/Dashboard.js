import React, { memo } from 'react';

import Graph from '../../components/Graph';
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
            {loading && <p>Loading...</p>}
            <Graph data={data} />

            {error && <p>{error}</p>}
        </div >
    );
});

export default DashBoard;