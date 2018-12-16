import React, { createRef } from 'react';

import ResultRow from './ResultRow';

const inputRef = createRef();

const AuthPage = ({
    getData,
    postData,
    response,
    loading,
    sending,
    queryError,
    postError
}) => {

    return (
        <div id='auth-page' className={loading || sending ? 'loading' : ''}>
            <h2>Auth page</h2>

            <h4>Get data</h4>
            {queryError && <p>Error : {queryError.toString()}</p>}

            {response && response.data &&
                <ul>
                    {response.data.map(({ key: time, value }, key) =>
                        <ResultRow key={key} {...{ time, value }} />)}
                </ul>}

            <button
                onClick={getData}
                loading={loading}
                text='Get data' />

            <h4>Send data</h4>
            {postError && <p>Error : {postError.toString()}</p>}

            <input
                ref={inputRef}
                type="text" />

            <SubmitButton
                onClick={() => postData({ value: inputRef.current.value })}
                loading={sending}
                text='Send data' />
        </div>
    );
};

export default AuthPage;