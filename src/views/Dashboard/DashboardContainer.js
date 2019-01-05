import React, { useEffect } from 'react';

import Dashboard from './Dashboard';
import { useFadeIn, useDataAccess } from '../../hooks';

const DashBoardContainer = () => {
    const className = useFadeIn();
    const { state, getData } = useDataAccess();

    useEffect(getData, []);

    return (
        <Dashboard {...{
            state,
            className,
        }} />
    );
};

export default DashBoardContainer;