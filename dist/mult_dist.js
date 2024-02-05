"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mult_dist = void 0;
var distance_1 = require("./distance");
/*
 * Distance computation based on multiple matrices (not squared)
 *
 * Simultaneous Matrix Orderings for Graph Collections.
 * Nathan van Beusekom, Wouter Meulemans, and Bettina Speckmann.
 * IEEE Transactions on Visualization and Computer Graphics, 28(1), pp 1-10, 2021.
 * https://arxiv.org/abs/2109.12050
 */
function mult_dist() {
    var distance = distance_1.distance.euclidean;
    function mult_dist(matrices, distances) {
        var n = matrices.length;
        var res = [];
        for (var i = 0; i < matrices[0].length; i++) {
            var newrow = [];
            for (var j = 0; j < matrices[0][0].length; j++) {
                newrow.push(0);
            }
            res.push(newrow);
        }
        for (var k = 0; k < n; k++) {
            distance = distances[k];
            var distMatrix = [];
            var vector = matrices[k];
            var n1 = vector.length;
            for (var i = 0; i < n1; i++) {
                var d = [];
                distMatrix[i] = d;
                for (var j = 0; j < n1; j++) {
                    if (j < i) {
                        d[j] = distMatrix[j][i];
                    }
                    else if (i === j) {
                        d[j] = 0;
                    }
                    else {
                        d[j] = distance(vector[i], vector[j]);
                    }
                }
            }
            for (var i = 0; i < distMatrix.length; i++) {
                for (var j = 0; j < distMatrix[0].length; j++) {
                    res[i][j] += distMatrix[i][j];
                }
            }
        }
        return res;
    }
    mult_dist.distance = function (x) {
        if (!arguments.length) {
            return distance;
        }
        distance = x;
        return mult_dist;
    };
    return mult_dist;
}
exports.mult_dist = mult_dist;
