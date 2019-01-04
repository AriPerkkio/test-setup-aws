import React from 'react';

import Dashboard from './Dashboard';
import { useFadeIn, useData } from '../../hooks';

const DashBoardContainer = () => {
    const className = useFadeIn();
    const state = useData();

    return (
        <Dashboard {...{
            state,
            className,
        }} />
    );
};

export default DashBoardContainer;