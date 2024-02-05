"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.barycenter = exports.barycenter_order = void 0;
var utils_1 = require("./utils");
var permutation_1 = require("./permutation");
var core_1 = require("./core");
var count_crossings_1 = require("./count_crossings");
function barycenter_order(graph, comps, max_iter) {
    var orders = [[], [], 0];
    // Compute the barycenter heuristic on each connected component
    if (!comps) {
        comps = graph.components();
    }
    for (var i = 0; i < comps.length; i++) {
        var o = barycenter(graph, comps[i], max_iter);
        orders = [orders[0].concat(o[0]), orders[1].concat(o[1]), orders[2] + o[2]];
    }
    return orders;
}
exports.barycenter_order = barycenter_order;
// Take the list of neighbor indexes and return the median according to
// P. Eades and N. Wormald, Edge crossings in drawings of bipartite graphs.
// Algorithmica, vol. 11 (1994) 379–403.
function median(neighbors) {
    if (neighbors.length === 0) {
        return -1;
    } // should not happen
    if (neighbors.length === 1) {
        return neighbors[0];
    }
    if (neighbors.length === 2) {
        return (neighbors[0] + neighbors[1]) / 2;
    }
    neighbors.sort(utils_1.cmp_number);
    if (neighbors.length % 2) {
        return neighbors[(neighbors.length - 1) / 2];
    }
    var rm = neighbors.length / 2;
    var lm = rm - 1;
    var rspan = neighbors[neighbors.length - 1] - neighbors[rm];
    var lspan = neighbors[lm] - neighbors[0];
    if (lspan == rspan) {
        return (neighbors[lm] + neighbors[rm]) / 2;
    }
    else {
        return (neighbors[lm] * rspan + neighbors[rm] * lspan) / (lspan + rspan);
    }
}
function barycenter(graph, comp, max_iter) {
    var nodes = graph.nodes();
    var crossings;
    var iter;
    var layer;
    var neighbors;
    var med;
    var layer1 = comp.filter(function (n) { return graph.outDegree(n) !== 0; });
    var layer2 = comp.filter(function (n) { return graph.inDegree(n) !== 0; });
    // If the layers are equal, we want to modify them simultaneously (for undirected graphs)
    if (!graph.directed()) {
        layer1 = layer2;
    }
    if (comp.length < 3) {
        return [layer1, layer2, (0, count_crossings_1.count_crossings)(graph, layer1, layer2)];
    }
    if (!max_iter) {
        max_iter = 24;
    }
    else if (max_iter % 2 == 1) {
        max_iter++;
    } // want even number of iterations
    var inv_layer = (0, permutation_1.inverse_permutation)(layer2);
    var best_crossings = (0, count_crossings_1.count_crossings)(graph, layer1, layer2);
    var best_layer1 = layer1.slice();
    var best_layer2 = layer2.slice();
    var best_iter = 0;
    var v;
    var inv_neighbor = function (e) {
        return inv_layer[e.source == v ? e.target.index : e.source.index];
    };
    var barycenter_sort = function (a, b) {
        var d = med[a] - med[b];
        if (d === 0) {
            // If both values are equal,
            // place the odd degree vertex on the left of the even
            // degree vertex
            d = (graph.edges(b).length % 2) - (graph.edges(a).length % 2);
        }
        if (d < 0) {
            return -1;
        }
        else if (d > 0) {
            return 1;
        }
        return 0;
    };
    for (layer = layer1, iter = 0; iter < max_iter; iter++, layer = layer == layer1 ? layer2 : layer1) {
        med = {};
        for (var i = 0; i < layer.length; i++) {
            // Compute the median/barycenter for this node and set
            // its (real) value into node.pos
            v = nodes[layer[i]];
            var _tmp = void 0;
            if (layer == layer1) {
                _tmp = graph.outEdges(v.index);
            }
            else {
                _tmp = graph.inEdges(v.index);
            }
            neighbors = neighbors.map(inv_neighbor);
            med[v.index] = +median(neighbors);
        }
        layer.sort(barycenter_sort);
        for (var i = 0; i < layer.length; i++) {
            inv_layer = (0, permutation_1.inverse_permutation)(layer);
        }
        crossings = (0, count_crossings_1.count_crossings)(graph, layer1, layer2);
        if (crossings < best_crossings) {
            best_crossings = crossings;
            best_layer1 = layer1.slice();
            best_layer2 = layer2.slice();
            best_iter = iter;
            max_iter = Math.max(max_iter, iter + 2); // we improved so go on
        }
    }
    if (core_1.debug) {
        console.log("Best iter: ".concat(best_iter));
    }
    return [best_layer1, best_layer2, best_crossings];
}
exports.barycenter = barycenter;
