"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.valuemats_reorder = exports.graph2valuemats = exports.distmat2valuemat = void 0;
var aliases_1 = require("./aliases");
var dist_1 = require("./dist");
var all_pairs_distance_1 = require("./all_pairs_distance");
var permute_1 = require("./permute");
var utils_1 = require("./utils");
// Converts a graph with weighted edges (weight in l.value)
// into a distance matrix suitable for reordering with e.g.
// Optimal Leaf Ordering.
function distmat2valuemat(distmat) {
    var n = distmat.length;
    var valuemat = (0, aliases_1.zeroes)(n, n);
    var max_dist = (0, dist_1.distmax)(distmat);
    for (var i = 0; i < n; i++) {
        for (var j = i; j < n; j++) {
            valuemat[j][i] = valuemat[i][j] = 1 + max_dist - distmat[i][j];
        }
    }
    return valuemat;
}
exports.distmat2valuemat = distmat2valuemat;
function graph2valuemats(graph, comps) {
    if (!comps) {
        comps = graph.components();
    }
    var dists = (0, all_pairs_distance_1.all_pairs_distance)(graph, comps);
    return dists.map(distmat2valuemat);
}
exports.graph2valuemats = graph2valuemats;
function valuemats_reorder(valuemats, leaforder, comps) {
    var orders = valuemats.map(leaforder);
    if (comps) {
        orders = orders.map(function (d, i) { return (0, permute_1.permute)(comps[i], d); });
    }
    return orders.reduce(utils_1.flatten);
}
exports.valuemats_reorder = valuemats_reorder;
