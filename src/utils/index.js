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

export {
    concatClasses
};