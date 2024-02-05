"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pca_order = exports.pca1d = void 0;
var mean_1 = require("./mean");
var covariance_1 = require("./covariance");
var poweriteration_1 = require("./poweriteration");
var sort_order_1 = require("./sort_order");
// Takes a matrix, substract the mean of each row
// so that the mean is 0
function center(v) {
    var n = v.length;
    if (n === 0) {
        return null;
    }
    var mean = (0, mean_1.meancolumns)(v);
    var o = mean.length;
    var v1 = Array(n);
    for (var i = 0; i < n; i++) {
        var row = v[i].slice(0);
        for (var j = 0; j < o; j++) {
            row[j] -= mean[j];
        }
        v1[i] = row;
    }
    return v1;
}
// See http://en.wikipedia.org/wiki/Power_iteration
function pca1d(v, eps) {
    if (v.length === 0) {
        return null;
    }
    v = center(v);
    var cov = (0, covariance_1.variancecovariance)(v);
    return (0, poweriteration_1.poweriteration)(cov, undefined, eps);
}
exports.pca1d = pca1d;
function pca_order(v, eps) {
    return (0, sort_order_1.sort_order)(pca1d(v, eps));
}
exports.pca_order = pca_order;
