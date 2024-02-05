"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mat2graph = void 0;
var graph_1 = require("./graph");
function mat2graph(mat, directed) {
    var n = mat.length;
    var nodes = [];
    var links = [];
    var max_value = Number.NEGATIVE_INFINITY;
    for (var i = 0; i < n; i++) {
        nodes.push({ id: i });
    }
    for (var i = 0; i < n; i++) {
        var v = mat[i];
        var m = directed ? 0 : i;
        for (var j = m; j < v.length; j++) {
            if (j == nodes.length) {
                nodes.push({ id: j });
            }
            if (v[j] !== 0) {
                if (v[j] > max_value) {
                    max_value = v[j];
                }
                links.push({ source: i, target: j, value: v[j] });
            }
        }
    }
    return (0, graph_1.graph)(nodes, links, directed)
        .linkDistance(function (l) { return 1 + max_value - l.value; })
        .init();
}
exports.mat2graph = mat2graph;
