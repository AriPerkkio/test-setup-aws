import React from 'react';

import Dashboard from './Dashboard';
import { useFadeIn } from '../../hooks';

const DashBoardContainer = () => {
    const className = useFadeIn();

    return (
        <Dashboard className={className} />
    );
};

export default DashBoardContainer;