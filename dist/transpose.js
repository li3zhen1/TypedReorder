"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transposeSlice = void 0;
function transposeSlice(a, start, end) {
    if (start === void 0) { start = 0; }
    if (end === void 0) { end = a[0].length; }
    var m = a.length;
    var n = end;
    var b = new Array(end - start);
    var i = start - 1;
    while (++i < n) {
        b[i] = new Array(m);
        var j = -1;
        while (++j < m) {
            b[i - start][j] = a[j][i];
        }
    }
    return b;
}
exports.transposeSlice = transposeSlice;
