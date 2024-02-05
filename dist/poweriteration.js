"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.poweriteration_n = exports.poweriteration = void 0;
var aliases_1 = require("./aliases");
var debug_1 = require("./debug");
var random_1 = require("./random");
var core_1 = require("./core");
function normalize(v) {
    var norm = (0, aliases_1.length)(v);
    var i = v.length;
    if (norm === 0 || Math.abs(norm - 1) < 1e-9) {
        return 1;
    }
    while (i-- > 0) {
        v[i] /= norm;
    }
    return norm;
}
function poweriteration(v, init, eps) {
    if (!eps) {
        eps = 1e-9;
    }
    var n = v.length;
    var b;
    var tmp = Array(n);
    var s = 100;
    (0, debug_1.assert)(n == v[0].length, 'poweriteration needs a square matrix');
    if (!init) {
        b = (0, random_1.random_array)(n);
    }
    else {
        // copy
        b = init.slice();
    }
    normalize(b);
    while (s-- > 0) {
        for (var i = 0; i < n; i++) {
            tmp[i] = 0;
            for (var j = 0; j < n; j++) {
                tmp[i] += v[i][j] * b[j];
            }
        }
        normalize(tmp);
        if ((0, aliases_1.dot)(tmp, b) > 1.0 - eps) {
            break;
        }
        var t = tmp;
        tmp = b;
        b = t; // swap b/tmp
    }
    return tmp;
}
exports.poweriteration = poweriteration;
function poweriteration_n(v, p, init, start, eps) {
    if (!eps) {
        eps = 1e-9;
    }
    var n = v.length;
    var b = Array(p);
    var tmp = Array(n);
    var s = 100;
    var eigenvalue = Array(p);
    (0, debug_1.assert)(n == v[0].length, 'poweriteration needs a square matrix');
    if (!init) {
        for (var i = 0; i < p; i++) {
            var row = (b[i] = (0, random_1.random_array)(n));
            eigenvalue[i] = normalize(row);
        }
    }
    else {
        for (var i = 0; i < p; i++) {
            b[i] = init[i].slice(); // copy
            eigenvalue[i] = normalize(b[i]);
        }
    }
    if (!start) {
        start = 0;
    }
    for (var k = start; k < p; k++) {
        var bk = b[k];
        while (s-- > 0) {
            // Orthogonalize vector
            for (var l = 0; l < k; l++) {
                var row = b[l];
                var d = (0, aliases_1.dot)(bk, row);
                for (var i = 0; i < n; i++) {
                    bk[i] -= d * row[i];
                }
            }
            for (var i = 0; i < n; i++) {
                tmp[i] = 0;
                for (var j = 0; j < n; j++) {
                    tmp[i] += v[i][j] * bk[j];
                }
            }
            eigenvalue[k] = normalize(tmp);
            if ((0, aliases_1.dot)(tmp, bk) > 1 - eps) {
                break;
            }
            bk = tmp;
            tmp = b[k];
            b[k] = bk; // swap b/tmp
        }
        if (core_1.debug) {
            console.log('eig[%d]=%j', k, bk);
        }
    }
    return [b, eigenvalue];
}
exports.poweriteration_n = poweriteration_n;
