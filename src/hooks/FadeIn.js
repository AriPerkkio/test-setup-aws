import { useEffect, useState } from 'react';

/**
    Simple fade in without adding dependency to react-transition-group. Works also as a hook practice.
*/
const useFadeIn = () => {
    const [className, setClassName] = useState('no-opacity');
    const removeClass = () => setClassName('');

    useEffect(removeClass, []);

    return className;
};

export default useFadeIn;