"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.variancecovariance = exports.covariancetranspose = exports.covariance = void 0;
var aliases_1 = require("./aliases");
exports.covariance = aliases_1.dot;
function covariancetranspose(v, a, b) {
    var n = v.length;
    var cov = 0;
    for (var i = 0; i < n; i++) {
        cov += v[i][a] * v[i][b];
    }
    return cov;
}
exports.covariancetranspose = covariancetranspose;
function variancecovariance(v) {
    var o = v[0].length;
    var cov = Array(o);
    for (var i = 0; i < o; i++) {
        cov[i] = Array(o);
    }
    for (var i = 0; i < o; i++) {
        for (var j = i; j < o; j++) {
            cov[i][j] = cov[j][i] = covariancetranspose(v, i, j);
        }
    }
    return cov;
}
exports.variancecovariance = variancecovariance;
