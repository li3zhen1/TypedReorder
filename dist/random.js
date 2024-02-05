"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.random_matrix = exports.random_array = exports.randomPermutation = exports.randomPermute = void 0;
var permutation_1 = require("./permutation");
var aliases_1 = require("./aliases");
/* Fisher-Yates shuffle.
   See http://bost.ocks.org/mike/shuffle/
 */
function randomPermute(array, i, j) {
    if (i === void 0) { i = 0; }
    if (j === void 0) { j = array.length; }
    var m = j - i;
    while (m > 0) {
        var k = i + Math.floor(Math.random() * m--);
        var t = array[i + m];
        array[i + m] = array[k];
        array[k] = t;
    }
    return array;
}
exports.randomPermute = randomPermute;
function randomPermutation(n) {
    return randomPermute((0, permutation_1.permutation)(n));
}
exports.randomPermutation = randomPermutation;
function random_array(n, min, max) {
    var ret = Array(n);
    if (arguments.length == 1) {
        while (n) {
            ret[--n] = Math.random();
        }
    }
    else if (arguments.length == 2) {
        while (n) {
            ret[--n] = Math.random() * min;
        }
    }
    else {
        while (n) {
            ret[--n] = min + Math.random() * (max - min);
        }
    }
    return ret;
}
exports.random_array = random_array;
function random_matrix(p, n, m, sym) {
    if (!m) {
        m = n;
    }
    if (n != m) {
        sym = false;
    }
    else if (!sym) {
        sym = true;
    }
    var mat = (0, aliases_1.zeroes)(n, m);
    if (sym) {
        for (var i = 0; i < n; i++) {
            var cnt = 0;
            for (var j = 0; j < i + 1; j++) {
                if (Math.random() < p) {
                    mat[i][j] = mat[j][i] = 1;
                    cnt++;
                }
            }
            if (cnt === 0) {
                var j = Math.floor((Math.random() * n) / 2);
                mat[i][j] = mat[j][i] = 1;
            }
        }
    }
    else {
        for (var i = 0; i < n; i++) {
            var cnt = 0;
            for (var j = 0; j < m; j++) {
                if (Math.random() < p) {
                    mat[i][j] = 1;
                    cnt++;
                }
            }
            if (cnt === 0) {
                mat[i][Math.floor(Math.random() * m)] = 1;
            }
        }
    }
    return mat;
}
exports.random_matrix = random_matrix;
