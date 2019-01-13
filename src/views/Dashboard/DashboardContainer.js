import React, { useEffect, useRef, useCallback } from 'react';

import Dashboard from './Dashboard';
import { useFadeIn, useDataAccess } from '../../hooks';

const mapPropsToState = state => ({
    sending: state.sending,
    loading: state.loading,
    data: state.data,
    error: state.error,
});

const DashBoardContainer = () => {
    const formRef = useRef();
    const className = useFadeIn();
    const { state, getData, postData } = useDataAccess(mapPropsToState);
    const { data, sending, loading, error } = state;

    useEffect(() => { getData(); }, []);

    const onSubmit = useCallback(
        data => postData(data).then(() => formRef.current.reset()),
        [formRef, postData]
    );

    return (
        <Dashboard {...{
            data,
            loading,
            sending,
            error,
            className,
            onSubmit,
            formRef,
        }} />
    );
};

export default DashBoardContainer;