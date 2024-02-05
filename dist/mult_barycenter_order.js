"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mult_barycenter = exports.count_all_crossings = exports.mult_barycenter_order = void 0;
var utils_1 = require("./utils");
var permutation_1 = require("./permutation");
var core_1 = require("./core");
var count_crossings_1 = require("./count_crossings");
function mult_barycenter_order(graphs, comps, max_iter) {
    var orders = [[], [], 0];
    comps = graphs[0].components();
    var o = mult_barycenter(graphs, comps.flat(), max_iter);
    orders = [orders[0].concat(o[0]), orders[1].concat(o[1]), orders[2] + o[2]];
    return orders;
}
exports.mult_barycenter_order = mult_barycenter_order;
// Take the list of neighbor indexes and return the median according to
// P. Eades and N. Wormald, Edge crossings in drawings of bipartite graphs.
// Algorithmica, vol. 11 (1994) 379â€“403.
function median(neighbors) {
    if (neighbors.length === 0) {
        return 0;
    } // Place on end
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
function count_all_crossings(graphs, layer1, layer2) {
    var sum = 0;
    var max = 0;
    for (var i = 0; i < graphs.length; i++) {
        var c = (0, count_crossings_1.count_crossings)(graphs[i], layer1, layer2);
        sum += c;
        if (c > max) {
            max = c;
        }
    }
    return sum;
}
exports.count_all_crossings = count_all_crossings;
function mult_barycenter(graphs, comp, max_iter) {
    var nodes = graphs[0].nodes();
    var crossings;
    var iter;
    var layer;
    var neighbors;
    var med;
    var directed = false;
    var layer1 = comp.filter(function (n) {
        for (var i = 0; i < graphs.length; i++) {
            if (graphs[i].outDegree(n) !== 0) {
                return true;
            }
            return false;
        }
    });
    var layer2 = comp.filter(function (n) {
        for (var i = 0; i < graphs.length; i++) {
            if (graphs[i].inDegree(n) !== 0) {
                return true;
            }
            return false;
        }
    });
    for (var i = 0; i < graphs.length; i++) {
        if (graphs[i].directed()) {
            directed = true;
        }
    }
    // If the layers are equal, we want to modify them simultaneously (for undirected graphs)
    if (!directed) {
        layer1 = layer2;
    }
    if (comp.length < 3) {
        return [layer1, layer2, count_all_crossings(graphs, layer1, layer2)];
    }
    if (!max_iter) {
        max_iter = 24;
    }
    else if (max_iter % 2 == 1) {
        max_iter++;
    } // want even number of iterations
    var inv_layer = (0, permutation_1.inverse_permutation)(layer2);
    var best_crossings = count_all_crossings(graphs, layer1, layer2);
    var best_layer1 = layer1.slice();
    var best_layer2 = layer2.slice();
    var best_iter = 0;
    var v;
    var inv_neighbor = function (e) {
        return inv_layer[e.source == v ? e.target.index : e.source.index];
    };
    function barycenter_sort(graph) {
        return function (a, b) {
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
    }
    for (layer = layer1, iter = 0; iter < max_iter; iter++, layer = layer == layer1 ? layer2 : layer1) {
        med = {};
        // Compute median of medians
        for (var t = 0; t < graphs.length; t++) {
            nodes = graphs[t].nodes();
            for (var i = 0; i < layer.length; i++) {
                v = nodes[layer[i]];
                if (t === 0) {
                    med[v.index] = [];
                }
                if (layer == layer1) {
                    neighbors = graphs[t].outEdges(v.index);
                }
                else {
                    neighbors = graphs[t].inEdges(v.index);
                }
                neighbors = neighbors.map(inv_neighbor);
                if (neighbors.length > 0) {
                    med[v.index].push(+median(neighbors));
                }
            }
        }
        nodes = graphs[0].nodes();
        for (var i = 0; i < layer.length; i++) {
            v = nodes[layer[i]];
            if (med[v.index].length > 0) {
                med[v.index] = median(med[v.index]); // d3 or this median?
            }
            else {
                med[v.index] = 0;
            }
        }
        layer.sort(barycenter_sort(graphs[0])); // ?? TODO
        for (var i = 0; i < layer.length; i++) {
            inv_layer = (0, permutation_1.inverse_permutation)(layer);
        }
        crossings = count_all_crossings(graphs, layer1, layer2);
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
exports.mult_barycenter = mult_barycenter;
