"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nn_2opt = void 0;
var distance_1 = require("./distance");
var dist_1 = require("./dist");
function nn_2opt() {
    var distanceMatrix = null;
    var distance = distance_1.distance.euclidean;
    var epsilon = 0.0001;
    nn_2opt.distance = function (x) {
        if (!arguments.length) {
            return distance;
        }
        distance = x;
        distanceMatrix = null;
        return nn_2opt;
    };
    nn_2opt.distance_matrix = function (x) {
        if (!arguments.length) {
            return distanceMatrix;
        }
        // copy
        distanceMatrix = x.map(function (y) { return y.slice(0); });
        return nn_2opt;
    };
    function nn_2opt(matrix) {
        if (distanceMatrix === null) {
            distanceMatrix = (0, dist_1.dist)().distance(distance)(matrix);
        }
        var lowest_dist_all = Number.MAX_VALUE;
        var best_order_all = [];
        // Try each row as the initial permutation for NN-2OPT
        for (var s = 0; s < distanceMatrix.length; s++) {
            var order = [];
            order.push(s);
            // NN
            while (order.length < distanceMatrix.length) {
                var nearest = -1;
                for (var i = 0; i < distanceMatrix.length; i++) {
                    if (!order.includes(i)) {
                        var last = order[order.length - 1];
                        if (nearest === -1) {
                            nearest = i;
                        }
                        else if (distanceMatrix[last][i] < distanceMatrix[last][nearest]) {
                            nearest = i;
                        }
                    }
                }
                order.push(nearest);
            }
            var newdist = getTotal(order);
            var olddist = newdist - (epsilon + 1);
            // 2-OPT
            var lowest_dist_2opt = Number.MAX_VALUE;
            var best_order_2opt = [];
            while (newdist - olddist > epsilon) {
                for (var i = 0; i < order.length; i++) {
                    for (var j = i + 2; j < order.length - 1; j++) {
                        // edge 1: (i,i+1) edge2: (j,j+1)
                        var currentd = distanceMatrix[order[i]][order[i + 1]] +
                            distanceMatrix[order[j]][order[j + 1]];
                        var candidated = distanceMatrix[order[i]][order[j]] +
                            distanceMatrix[order[i + 1]][order[j + 1]];
                        if (candidated < currentd) {
                            var check = [];
                            for (var k = 0; k < order.length; k++) {
                                check[k] = order[k];
                            }
                            // Reverse i+1 to j
                            for (var k = 0; k <= j - (i + 1); k++) {
                                check[i + 1 + k] = order[j - k];
                            }
                            order = check;
                        }
                    }
                }
                olddist = newdist;
                newdist = getTotal(order);
                if (newdist < lowest_dist_2opt) {
                    lowest_dist_2opt = newdist;
                    best_order_2opt = order;
                }
            }
            if (lowest_dist_2opt < lowest_dist_all) {
                lowest_dist_all = lowest_dist_2opt;
                best_order_all = best_order_2opt;
            }
        }
        return best_order_all;
    }
    function getTotal(order) {
        var sum = 0;
        for (var i = 0; i < order.length - 1; i++) {
            sum += distanceMatrix[order[i]][order[i + 1]];
        }
        return sum;
    }
    nn_2opt.distance = function (x) {
        if (!arguments.length) {
            return distance;
        }
        distance = x;
        distanceMatrix = null;
        return nn_2opt;
    };
    nn_2opt.distanceMatrix = nn_2opt.distance_matrix; // compatability
    return nn_2opt;
}
exports.nn_2opt = nn_2opt;
