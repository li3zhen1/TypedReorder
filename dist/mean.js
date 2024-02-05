"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.meancolumns = exports.meantranspose = void 0;
function meantranspose(v, j) {
    var n = v.length;
    if (n === 0) {
        return NaN;
    }
    var m = 0;
    var i = -1;
    while (++i < n) {
        m += (v[i][j] - m) / (i + 1);
    }
    return m;
}
exports.meantranspose = meantranspose;
function meancolumns(v) {
    var n = v.length;
    if (n === 0) {
        return NaN;
    }
    var o = v[0].length;
    var m = v[0].slice(0);
    var i = 0;
    while (++i < n) {
        var row = v[i];
        for (var j = 0; j < o; j++) {
            m[j] += (row[j] - m[j]) / (i + 1);
        }
    }
    return m;
}
exports.meancolumns = meancolumns;
