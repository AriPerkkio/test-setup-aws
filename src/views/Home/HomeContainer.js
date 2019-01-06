import React, { useRef } from 'react';

import Home from './Home';
import { useFadeIn, useDataAccess } from '../../hooks';

const HomeContainer = () => {
    const formRef = useRef();
    const className = useFadeIn();
    const { state, postData } = useDataAccess();
    const { sending, error } = state;

    const onSubmit = data =>
        postData(data)
            .then(() => formRef.current.reset());

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