import React from 'react';

import { concatClasses } from '../../utils';

const BASE_CLASS = 'home';

const Home = ({
    className,
    getData,
    postData,
    response,
    loading,
    sending,
    queryError,
    postError
}) => {
    const classNames = concatClasses(BASE_CLASS, className);

    return (
        <div className={classNames}>
            Homepage
        </div>
    );
};

export default Home;