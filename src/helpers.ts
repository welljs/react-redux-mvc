import {mergeWith, isArray} from 'lodash';

export function merge(dst, src) {
  // To prevent merging arrays, return initial
  if (isArray(dst) && isArray(src)) {
    return src;
  }
  else {
    return {
      ...mergeWith(dst, src, (objValue, srcValue) => {
        // To prevent merging arrays, return initial
        if (isArray(objValue)) {
          return srcValue;
        }
      })
    };
  }
}

export function generateGuid(): string {
  const S4 = (): string => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());
}
