"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
function merge(dst, src) {
    if (lodash_1.isArray(dst) && lodash_1.isArray(src)) {
        return src;
    }
    else {
        return __assign({}, lodash_1.mergeWith(dst, src, function (objValue, srcValue) {
            if (lodash_1.isArray(objValue)) {
                return srcValue;
            }
        }));
    }
}
exports.merge = merge;
function generateGuid() {
    var S4 = function () { return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1); };
    return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());
}
exports.generateGuid = generateGuid;
//# sourceMappingURL=helpers.js.map