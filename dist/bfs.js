"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.all_pairs_distance_bfs = exports.bfs_distances = exports.bfs = void 0;
var queue_1 = require("./queue");
var utils_1 = require("./utils");
function bfs(graph, v, fn) {
    var q = new queue_1.Queue();
    var discovered = {};
    q.push(v);
    discovered[v] = true;
    fn(v, undefined);
    while (q.length) {
        v = q.shift();
        fn(v, v);
        var edges = graph.edges(v);
        for (var i = 0; i < edges.length; i++) {
            var e = edges[i];
            var v2 = graph.other(e, v).index;
            if (!discovered[v2]) {
                q.push(v2);
                discovered[v2] = true;
                fn(v, v2);
            }
        }
        fn(v, -1);
    }
}
exports.bfs = bfs;
function bfs_distances(graph, v) {
    var dist = {};
    dist[v] = 0;
    bfs(graph, v, function (v, c) {
        if (c >= 0 && v != c) {
            dist[c] = dist[v] + 1;
        }
    });
    return dist;
}
exports.bfs_distances = bfs_distances;
function all_pairs_distance_bfs(graph, comps) {
    if (!comps) {
        comps = [graph.nodes_indices()];
    }
    var nodes = comps.reduce(utils_1.flatten).sort(utils_1.cmp_number);
    var mat = Array(nodes.length);
    for (var i = 0; i < nodes.length; i++) {
        mat[i] = Array(nodes.length);
    }
    for (var i = 0; i < nodes.length; i++) {
        var dist = bfs_distances(graph, i);
        for (var j in dist) {
            mat[i][j] = dist[j];
            mat[j][i] = dist[j];
        }
    }
    return mat;
}
exports.all_pairs_distance_bfs = all_pairs_distance_bfs;
