import React, { useEffect } from 'react';

import Dashboard from './Dashboard';
import { useFadeIn, useDataAccess } from '../../hooks';

const mapPropsToState = state => ({
    loading: state.loading,
    data: state.data,
    error: state.error,
});

const DashBoardContainer = () => {
    const className = useFadeIn();
    const { state, getData } = useDataAccess(mapPropsToState);
    const { data, loading, error } = state;

    useEffect(() => { getData(); }, []);

    return (
        <Dashboard {...{
            data,
            loading,
            error,
            className,
        }} />
    );
};

export default DashBoardContainer;