import React from 'react';

import { concatClasses } from '../../utils';

const BASE_CLASS = 'dashboard';

const DashBoard = ({
    className,
    state,
}) => {
    const classNames = concatClasses(BASE_CLASS, className);


    return (
        <div className={classNames}>
            Dashboard

            <pre>
                {JSON.stringify(state, null, 4)}
            </pre>
        </div >
    );
};

export default DashBoard;