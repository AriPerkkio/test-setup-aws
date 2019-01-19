import { useState, useEffect, useMemo } from 'react';

const setterWithThreshold = (threshold, setter) => () => (newSize, oldSize) => {
    if (Math.abs(newSize - oldSize) > threshold) {
        setTimeout(() => setter(newSize), 200);
    }
};

/**
 *  Track window innerWidth and innerHeight with given threshold
 */
const useWindowSize = (threshold) => {
    const [width, _setWidth] = useState(window.innerWidth);
    const [height, _setHeight] = useState(window.innerHeight);

    const setWidth = useMemo(setterWithThreshold(threshold, _setWidth), [threshold, _setWidth]);
    const setHeight = useMemo(setterWithThreshold(threshold, _setHeight), [threshold, _setHeight]);

    const updateSize = () => {
        setWidth(window.innerWidth, width);
        setHeight(window.innerHeight, height);
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