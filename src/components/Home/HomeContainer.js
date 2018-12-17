import React, { useState } from 'react';

import Home from './Home';
import { withContext } from '../../context';
import { withAuthentication } from '../../authentication';
import TestApi from '../../api/TestApi';

const HomeContainer = ({
    authToken
}) => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);
    const [queryError, setQueryError] = useState(null);
    const [postError, setPostError] = useState(null);

    const api = TestApi({ authToken });

    const getData = () => {
        setLoading(true);

        api.get()
            .then(setResponse)
            .then(() => setLoading(false))
            .catch(setQueryError);
    };

    const postData = data => {
        setSending(true);

        api.post(data)
            .then(() => setSending(false))
            .catch(setPostError);
    };

    return (
        <Home {...{
            getData,
            postData,
            response,
            loading,
            sending,
            queryError,
            postError,
        }} />
    );
};

export default withContext(withAuthentication(HomeContainer));