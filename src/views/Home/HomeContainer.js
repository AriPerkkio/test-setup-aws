import React, { useState, useContext, useRef } from 'react';

import Home from './Home';
import TestApi from '../../api/TestApi';
import { AuthContext } from '../../context';
import { useFadeIn } from '../../hooks';

const HomeContainer = () => {
    const [sending, setSending] = useState(false);
    const [error, setError] = useState(null);
    const formRef = useRef();

    const className = useFadeIn();
    const { authToken } = useContext(AuthContext);
    const api = TestApi({ authToken });

    const postData = data => {
        setSending(true);

        api.post(data)
            .then(() => setSending(false))
            .then(() => formRef.current.reset())
            .catch(setError);
    };

    return (
        <Home {...{
            className,
            postData,
            sending,
            error,
            formRef
        }} />
    );
};

export default HomeContainer;