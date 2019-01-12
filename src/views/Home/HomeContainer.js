import React, { useRef, useCallback } from 'react';

import Home from './Home';
import { useFadeIn, useDataAccess } from '../../hooks';

const mapPropsToState = state => ({
    sending: state.sending,
    error: state.error
});

const HomeContainer = () => {
    const formRef = useRef();
    const className = useFadeIn();
    const { state, postData } = useDataAccess(mapPropsToState);
    const { sending, error } = state;

    const onSubmit = useCallback(
        data => postData(data).then(() => formRef.current.reset()),
        [formRef, postData]
    );

    return (
        <Home {...{
            className,
            formRef,
            sending,
            error,
            onSubmit,
        }} />
    );
};

export default HomeContainer;