"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sum = void 0;
function sum(v) {
    var i = v.length;
    var s = 0;
    while (i-- > 0) {
        if (!isNaN(v[i])) {
            s += v[i];
        }
    }
    return s;
}
exports.sum = sum;
