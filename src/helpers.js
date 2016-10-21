import mergeWith from 'lodash/mergeWith';
import isArray from 'lodash/isArray';
export function merge (dst, src) {
    return {...mergeWith(dst, src, (objValue, srcValue) => {
        //чтобы не мержить массиы, возвращается исходный
        if (isArray(objValue)) {
            return srcValue;
        }
    })}
}


export function warning(message) {
    /* eslint-disable no-console */
    if (typeof console !== 'undefined' && typeof console.error === 'function') {
        console.error(message)
    }
    /* eslint-enable no-console */
    try {
        // This error was thrown as a convenience so that if you enable
        // "break on all exceptions" in your console,
        // it would pause the execution at this line.
        throw new Error(message)
        /* eslint-disable no-empty */
    } catch (e) {}
    /* eslint-enable no-empty */
}