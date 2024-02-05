"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bandwidth_matrix = exports.bandwidth = void 0;
var range_1 = require("./range");
var permutation_1 = require("./permutation");
/**
 * Compute the bandwidth of a graph, given and order.
 * @param  {Graph} graph - the graph
 * @param {list} order - a permutation
 * @returns {integer} the bandwidth
 */
function bandwidth(graph, order) {
    if (!order) {
        order = (0, range_1.range)(graph.nodes().length);
    }
    var inv = (0, permutation_1.inverse_permutation)(order);
    var links = graph.links();
    var max = 0;
    for (var i = 0; i < links.length; i++) {
        var e = links[i];
        var d = Math.abs(inv[e.source.index] - inv[e.target.index]);
        max = Math.max(max, d);
    }
    return max;
}
exports.bandwidth = bandwidth;
/**
 * Compute the bandwidth of an adjacency matrix,
 * i.e. the maximum distace between two endpoints
 * over all edges.
 * @param  {Matrix} matrix - the matrix
 * @returns {integer} the bandwidth
 */
function bandwidth_matrix(matrix) {
    var max = 0;
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j] > 0) {
                max = Math.max(max, Math.abs(i - j));
            }
        }
    }
    return max;
}
exports.bandwidth_matrix = bandwidth_matrix;
