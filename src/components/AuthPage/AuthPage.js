import React, { createRef } from 'react';

import SubmitButton from '../common/SubmitButton';

const inputRef = createRef();

const AuthPage = ({
    getData,
    postData,
    response,
    isLoading,
    isSending,
    queryError,
    postError
}) => {
    return (
        <div id='auth-page' className={isLoading ? 'loading' : ''}>
            <h2>Auth page</h2>

            <h4>Get data</h4>
            {queryError && <p>Error : {queryError.toString()}</p>}

            {response &&
                <pre style={{ color: 'red' }}>Api response : {JSON.stringify(response, null, 4)}</pre>}

            <SubmitButton
                onClick={getData}
                isLoading={isLoading}
                value='Get data' />

            <h4>Send data</h4>
            {postError && <p>Error : {postError.toString()}</p>}

            <input
                ref={inputRef}
                type="text" />

            <SubmitButton
                onClick={() => postData({ value: inputRef.current.value })}
                isLoading={isSending}
                value='Send data' />

        </div>
    );
};

export default AuthPage;