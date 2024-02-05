"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.edgesum = void 0;
var range_1 = require("./range");
var permutation_1 = require("./permutation");
function edgesum(graph, order) {
    if (order === void 0) { order = undefined; }
    if (!order) {
        order = (0, range_1.range)(graph.nodes().length);
    }
    var inv = (0, permutation_1.inverse_permutation)(order);
    var links = graph.links();
    var sum = 0;
    for (var i = 0; i < links.length; i++) {
        var e = links[i];
        var d = Math.abs(inv[e.source.index] - inv[e.target.index]);
        sum += d;
    }
    return sum;
}
exports.edgesum = edgesum;
