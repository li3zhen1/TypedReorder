"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fiedler_vector = void 0;
var core_1 = require("./core");
var poweriteration_1 = require("./poweriteration");
var utils_1 = require("./utils");
var random_1 = require("./random");
// Compute the Fiedler vector, the smallest non-null eigenvector of a matrix.
// See:
// Yehuda Koren, Liran Carmel, David Harel
// ACE: A Fast Multiscale Eigenvector Computation for Drawing Huge Graphs
// Extended version, available at:
// http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.19.7702&rep=rep1&type=pdf
// Transform the matrix B to reverse the order of the eigenvectors.
// B' = g . (I - B) where g is the Gershgorin bound, an upper bound
// for (the absolute value of) the largest eigenvalue of a matrix.
// Also, the smallest eigenvector is 1^n
function gershgorin_bound(B) {
    var max = 0;
    var n = B.length;
    for (var i = 0; i < n; i++) {
        var row = B[i];
        var t = row[i];
        for (var j = 0; j < n; j++) {
            if (j != i) {
                t += Math.abs(row[j]);
            }
        }
        if (t > max) {
            max = t;
        }
    }
    if (core_1.debug) {
        console.log('gershgorin_bound=%d', max);
    }
    return max;
}
function fiedler_vector(B, eps) {
    var g = gershgorin_bound(B);
    var n = B.length;
    // Copy B
    var Bhat = B.map(function (row) { return row.slice(); });
    for (var i = 0; i < n; i++) {
        var row = Bhat[i];
        for (var j = 0; j < n; j++) {
            if (i == j) {
                row[j] = g - row[j];
            }
            else {
                row[j] = -row[j];
            }
        }
    }
    var init = [(0, utils_1.array1d)(n, 1), (0, random_1.random_array)(n)];
    var eig = (0, poweriteration_1.poweriteration_n)(Bhat, 2, init, eps, 1);
    return eig[0][1];
}
exports.fiedler_vector = fiedler_vector;
