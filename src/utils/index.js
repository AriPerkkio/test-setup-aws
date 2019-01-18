const numRegex = /\d+/g;

const getTransformXY = d3Element => {
    if (!d3Element || !d3Element.node()) return {};

    const transformValue = d3Element.style('transform');
    const values = transformValue.match(numRegex);

    return {
        y: values.pop(),
        x: values.pop()
    };
};

const resolveClassInput = input => {
    let className = input;

    if (typeof input === 'function') {
        className = input();
    }

    return className ? className : '';
};

const concatClasses = (...classNames) => classNames
    .map(resolveClassInput)
    .join(' ').trim();

export { default as Authenticator } from './Authenticator';

export {
    concatClasses,
    getTransformXY,
};