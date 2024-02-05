"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mult_adjacent_exchange = void 0;
var permutation_1 = require("./permutation");
var adjacent_exchange_1 = require("./adjacent_exchange");
// TODO Cite simult
// Accorging to
// E. R. Gansner, E. Koutsofios, S. C. North, and K.-P. Vo. 1993. A
// Technique for Drawing Directed Graphs. IEEE Trans. Softw. Eng. 19, 3
// (March 1993), 214-230. DOI=10.1109/32.221135
// http://dx.doi.org/10.1109/32.221135
// page 14: "[...] reduce obvious crossings after the vertices have
// been sorted, transforming a given ordering to one that is locally
// optimal with respect to transposition of adjacent vertices. It
// typically provides an additional 20-50% reduction in edge crossings.
function count_all_in_crossings(graphs, a, b, layer) {
    var sum = 0;
    for (var i = 0; i < graphs.length; i++) {
        sum += (0, adjacent_exchange_1.count_in_crossings)(graphs[i], a, b, layer);
    }
    return sum;
}
function count_all_out_crossings(graphs, a, b, layer) {
    var sum = 0;
    for (var i = 0; i < graphs.length; i++) {
        sum += (0, adjacent_exchange_1.count_out_crossings)(graphs[i], a, b, layer);
    }
    return sum;
}
/**
 * Optimize two layers by swapping adjacent nodes when
 * it reduces the number of crossings.
 * @param {Graph} graphs - the graph these two layers belong to
 * @param {list} layer1 - the ordered list of nodes in layer 1
 * @param {list} layer2 - the ordered list of nodes in layer 2
 * @returns {list} a tuple containing the new layer1, layer2, and crossings count
 */
function mult_adjacent_exchange(graphs, layer1, layer2) {
    layer1 = layer1.slice();
    layer2 = layer2.slice();
    var inv_layer1 = (0, permutation_1.inverse_permutation)(layer1);
    var inv_layer2 = (0, permutation_1.inverse_permutation)(layer2);
    var swapped = true;
    var improved = 0;
    while (swapped) {
        swapped = false;
        for (var i = 0; i < layer1.length - 1; i++) {
            var v = layer1[i];
            var w = layer1[i + 1];
            var c0 = count_all_out_crossings(graphs, v, w, inv_layer2);
            var c1 = count_all_out_crossings(graphs, w, v, inv_layer2);
            if (c0 > c1) {
                layer1[i] = w;
                layer1[i + 1] = v;
                inv_layer1[w] = i;
                inv_layer1[v] = i + 1;
                swapped = true;
                improved += c0 - c1;
            }
        }
        for (var i = 0; i < layer2.length - 1; i++) {
            var v = layer2[i];
            var w = layer2[i + 1];
            var c0 = count_all_in_crossings(graphs, v, w, inv_layer1);
            var c1 = count_all_in_crossings(graphs, w, v, inv_layer1);
            if (c0 > c1) {
                layer2[i] = w;
                layer2[i + 1] = v;
                inv_layer2[w] = i;
                inv_layer2[v] = i + 1;
                swapped = true;
                improved += c0 - c1;
            }
        }
    }
    return [layer1, layer2, improved];
}
exports.mult_adjacent_exchange = mult_adjacent_exchange;
