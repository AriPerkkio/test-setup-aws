import React, { createRef } from 'react';

import ResultRow from './ResultRow';
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
        <div id='auth-page' className={isLoading || isSending ? 'loading' : ''}>
            <h2>Auth page</h2>

            <h4>Get data</h4>
            {queryError && <p>Error : {queryError.toString()}</p>}

            {response && response.data &&
                <ul>
                    {response.data.map(({ key: time, value }, key) =>
                        <ResultRow key={key} {...{ time, value }} />)}
                </ul>}

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