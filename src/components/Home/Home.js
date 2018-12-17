import React from 'react';

const BASE_CLASS = 'home';

const Home = ({
    getData,
    postData,
    response,
    loading,
    sending,
    queryError,
    postError
}) => {

    return (
        <div className={BASE_CLASS}>
            Homepage
        </div>
    );
};

export default Home;