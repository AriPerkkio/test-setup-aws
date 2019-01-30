import React from 'react';
import { hot } from 'react-hot-loader';

const BASE_CLASS = 'playground';

const Playground = () => {
    return (
        <div className={BASE_CLASS}>
            <h1>Playground</h1>
        </div>
    );
};

export default hot(module)(Playground);