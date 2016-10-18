export function merge (dst, src) {
    return {...mergeWith(dst, src, (objValue, srcValue) => {
        //чтобы не мержить массиы, возвращается исходный
        if (isArray(objValue)) {
            return srcValue;
        }
    })}
}
