import React, { useRef } from 'react';

import Home from './Home';
import TestApi from '../../api/TestApi';
import { AuthContext } from '../../context';
import { useFadeIn, useData } from '../../hooks';

const HomeContainer = () => {
    const formRef = useRef();
    const className = useFadeIn();


    return (
        <Home {...{
            className,
            formRef
        }} />
    );
};

export default HomeContainer;