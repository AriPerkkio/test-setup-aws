import React from 'react';

const BASE_CLASS = 'playground';

const Playground = () => {
    return (
        <div className={BASE_CLASS}>
            <h1>Playground</h1>

            <div className='temp' />
        </div>
    );
};

export default Playground;