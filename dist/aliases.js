"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transpose = exports.normalize = exports.length = exports.dot = exports.zeroes = exports.mean = void 0;
// Welford's algorithm.
function mean(x) {
    var n = x.length;
    if (n === 0)
        return NaN;
    var m = 0, i = -1;
    while (++i < n)
        m += (x[i] - m) / (i + 1);
    return m;
}
exports.mean = mean;
/*
 Constructs a multi-dimensional array filled with zeroes.
 */
function zeroes(n) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var i = -1, a = [];
    if (arguments.length === 1)
        while (++i < n)
            a[i] = 0;
    else
        while (++i < n)
            a[i] = zeroes.apply(this, Array.prototype.slice.call(arguments, 1));
    return a;
}
exports.zeroes = zeroes;
function dot(a, b) {
    var s = 0, i = -1, n = Math.min(a.length, b.length);
    while (++i < n)
        s += a[i] * b[i];
    return s;
}
exports.dot = dot;
function length(p) {
    return Math.sqrt(dot(p, p));
}
exports.length = length;
function normalize(p) {
    var _l = length(p);
    return p.map(function (d) {
        return d / _l;
    });
}
exports.normalize = normalize;
function transpose(a) {
    var m = a.length, n = a[0].length, i = -1, j, b = new Array(n);
    while (++i < n) {
        b[i] = new Array(m);
        j = -1;
        while (++j < m)
            b[i][j] = a[j][i];
    }
    return b;
}
exports.transpose = transpose;
