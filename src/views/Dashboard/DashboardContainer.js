import React, { useState, useContext, useEffect } from 'react';

import Dashboard from './Dashboard';
import TestApi from '../../api/TestApi';
import { AuthContext } from '../../context';
import { useFadeIn } from '../../hooks';

const DashBoardContainer = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const className = useFadeIn();
    const { authToken } = useContext(AuthContext);
    const api = TestApi({ authToken });

    const getData = () => {
        setLoading(true);

        api.get()
            .then(setData)
            .then(() => setLoading(false))
            .catch(setError);
    };

    useEffect(getData, []);

    return (
        <Dashboard {...{
            className,
            data,
            loading,
            error,
        }} />
    );
};

export default DashBoardContainer;