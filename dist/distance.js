"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.distance = void 0;
function isNum(a, b) {
    return !(isNaN(a) || isNaN(b) || a == Infinity || b == Infinity);
}
var euclidean = function (a, b) {
    var s = 0;
    for (var i = a.length - 1; i >= 0; i--) {
        if (isNum(a[i], b[i])) {
            var x = a[i] - b[i];
            s += x * x;
        }
    }
    return Math.sqrt(s);
};
var manhattan = function (a, b) {
    var s = 0;
    for (var i = a.length - 1; i >= 0; i--) {
        if (isNum(a[i], b[i])) {
            s += Math.abs(a[i] - b[i]);
        }
    }
    return s;
};
var minkowski = function (p) {
    return function (a, b) {
        var s = 0;
        for (var i = a.length - 1; i >= 0; i--) {
            if (isNum(a[i], b[i])) {
                s += Math.pow(Math.abs(a[i] - b[i]), p);
            }
        }
        return Math.pow(s, 1 / p);
    };
};
var chebyshev = function (a, b) {
    var max = 0;
    for (var i = a.length - 1; i >= 0; i--) {
        if (isNum(a[i], b[i])) {
            var x = Math.abs(a[i] - b[i]);
            if (x > max) {
                max = x;
            }
        }
    }
    return max;
};
var hamming = function (a, b) {
    var d = 0;
    for (var i = a.length - 1; i >= 0; i--) {
        if (isNum(a[i], b[i])) {
            if (a[i] !== b[i]) {
                d++;
            }
        }
    }
    return d;
};
var jaccard = function (a, b) {
    var n = 0;
    var s = 0;
    for (var i = a.length - 1; i >= 0; i--) {
        if (isNum(a[i], b[i])) {
            if (a[i] === b[i]) {
                s++;
            }
            n++;
        }
    }
    if (n === 0) {
        return 0;
    }
    return s / n;
};
var braycurtis = function (a, b) {
    var s0 = 0;
    var s1 = 0;
    for (var i = a.length - 1; i >= 0; i--) {
        var ai = a[i];
        var bi = b[i];
        if (isNum(ai, bi)) {
            s0 += Math.abs(ai - bi);
            s1 += Math.abs(ai + bi);
        }
    }
    if (s1 === 0) {
        return 0;
    }
    return s0 / s1;
};
// A distance measure based on Moran's I
// Note that this distance can be both negative (similar) and positive (not similar, the higher the distance, the less similar a and b)
//
// N. van Beusekom, W. Meulemans, B. Speckmann, Simultaneous Orderings for Graph Collections
// IEEE Transactions on Visualization and Computer Graphics, vol. 28, no. 1, pp. 1-10, Jan. 2022
var morans = function (matrix) {
    var m = 0;
    var n = matrix.length * matrix[0].length;
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[0].length; j++) {
            m += matrix[i][j];
        }
    }
    return function (a, b) {
        var result = 0;
        for (var i = 0; i < a.length; i++) {
            if (isNum(a[i], b[i])) {
                result += (a[i] * n - m) * (b[i] * n - m);
            }
        }
        return -1 * result;
    };
};
exports.distance = {
    euclidean: euclidean,
    manhattan: manhattan,
    minkowski: minkowski,
    chebyshev: chebyshev,
    hamming: hamming,
    jaccard: jaccard,
    braycurtis: braycurtis,
    morans: morans
};
