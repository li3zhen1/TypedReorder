"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reverse_cuthill_mckee_order = exports.cuthill_mckee_order = exports.reverse_cuthill_mckee = exports.cuthill_mckee = void 0;
var queue_1 = require("./queue");
var permutation_1 = require("./permutation");
/*jshint loopfunc:true */
function cuthill_mckee(graph, comp) {
    if (comp.length < 3) {
        return comp;
    }
    var visited = {};
    var queue = new queue_1.Queue();
    var inv = (0, permutation_1.inverse_permutation)(comp);
    var perm = [];
    var start = comp[0];
    var min_deg = graph.degree(start);
    for (var i = 0; i < comp.length; i++) {
        var n = comp[i];
        if (graph.degree(n) < min_deg) {
            min_deg = graph.degree(n);
            start = n;
            if (min_deg == 1) {
                break;
            }
        }
    }
    queue.push(start);
    var _loop_1 = function () {
        var n = queue.shift();
        if (visited[n]) {
            return "continue";
        }
        visited[n] = true;
        perm.push(n);
        var e = graph
            .edges(n)
            .map(function (edge) { return graph.other(edge, n).index; })
            .filter(function (n) { return !visited[n] && n in inv; })
            // ascending by degree
            .sort(function (a, b) { return graph.degree(a) - graph.degree(b); });
        e.forEach(queue.push, queue);
    };
    while (queue.length !== 0) {
        _loop_1();
    }
    return perm;
}
exports.cuthill_mckee = cuthill_mckee;
function reverse_cuthill_mckee(graph, comp) {
    return cuthill_mckee(graph, comp).reverse();
}
exports.reverse_cuthill_mckee = reverse_cuthill_mckee;
function cuthill_mckee_order(graph, comps) {
    var comp;
    var order = [];
    if (!comps) {
        comps = graph.components();
    }
    for (var i = 0; i < comps.length; i++) {
        comp = comps[i];
        order = order.concat(cuthill_mckee(graph, comp));
    }
    return order;
}
exports.cuthill_mckee_order = cuthill_mckee_order;
function reverse_cuthill_mckee_order(graph, comps) {
    var comp;
    var order = [];
    if (!comps) {
        comps = graph.components();
    }
    for (var i = 0; i < comps.length; i++) {
        comp = comps[i];
        order = order.concat(reverse_cuthill_mckee(graph, comp));
    }
    return order;
}
exports.reverse_cuthill_mckee_order = reverse_cuthill_mckee_order;
