"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.laplacian = void 0;
var aliases_1 = require("./aliases");
var debug_1 = require("./debug");
var permutation_1 = require("./permutation");
function laplacian(graph, comp) {
    var n = comp.length;
    var lap = (0, aliases_1.zeroes)(n, n);
    var inv = (0, permutation_1.inverse_permutation)(comp);
    (0, debug_1.assert)(!graph.directed(), 'Laplacian only for undirected graphs');
    for (var i = 0; i < n; i++) {
        var v = comp[i];
        var row = lap[i];
        var sum = 0;
        var edges = graph.edges(v);
        for (var j = 0; j < edges.length; j++) {
            var e = edges[j];
            var other = inv[graph.other(e, v).index];
            if (other != i) {
                sum += e.value;
                row[other] = -e.value;
            }
        }
        row[i] = sum;
    }
    return lap;
}
exports.laplacian = laplacian;
