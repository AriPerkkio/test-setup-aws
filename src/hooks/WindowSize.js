import { useReducer, useEffect } from 'react';

const reducerWithThreshold = threshold => (oldSize, newSize) => {
    if (Math.abs(newSize - oldSize) > threshold) {
        return newSize;
    }

    return oldSize;
};

/**
 *  Track window innerWidth and innerHeight with given threshold
 */
const useWindowSize = threshold => {
    const reducer = reducerWithThreshold(threshold);
    const [width, setWidth] = useReducer(reducer, window.innerWidth);
    const [height, setHeight] = useReducer(reducer, window.innerHeight);

    const updateSize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    };

    useEffect(() => {
        window.addEventListener('resize', updateSize);

        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return {
        width,
        height,
    };
};

export default useWindowSize;
