"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dist_remove = exports.distmin = exports.distmax = exports.dist = void 0;
var distance_1 = require("./distance");
function dist() {
    var distance = distance_1.distance.euclidean;
    function dist(vectors) {
        var n = vectors.length;
        var distMatrix = [];
        for (var i = 0; i < n; i++) {
            var d = [];
            distMatrix[i] = d;
            for (var j = 0; j < n; j++) {
                if (j < i) {
                    d.push(distMatrix[j][i]);
                }
                else if (i === j) {
                    d.push(0);
                }
                else {
                    d.push(distance(vectors[i], vectors[j]));
                }
            }
        }
        return distMatrix;
    }
    dist.distance = function (x) {
        if (!arguments.length) {
            return distance;
        }
        distance = x;
        return dist;
    };
    return dist;
}
exports.dist = dist;
function distmax(distMatrix) {
    var max = 0;
    var n = distMatrix.length;
    for (var i = 0; i < n; i++) {
        var row = distMatrix[i];
        for (var j = i + 1; j < n; j++) {
            if (row[j] > max) {
                max = row[j];
            }
        }
    }
    return max;
}
exports.distmax = distmax;
function distmin(distMatrix) {
    var min = Infinity;
    var n = distMatrix.length;
    for (var i = 0; i < n; i++) {
        var row = distMatrix[i];
        for (var j = i + 1; j < n; j++) {
            if (row[j] < min) {
                min = row[j];
            }
        }
    }
    return min;
}
exports.distmin = distmin;
function dist_remove(dist, n, m) {
    if (m === void 0) { m = n + 1; }
    dist.splice(n, m - n);
    for (var i = dist.length; i-- > 0;) {
        dist[i].splice(n, m - n);
    }
    return dist;
}
exports.dist_remove = dist_remove;
