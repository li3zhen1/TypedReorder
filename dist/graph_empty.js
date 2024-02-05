"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graph_empty = exports.graph_empty_nodes = void 0;
var graph_1 = require("./graph");
function graph_empty_nodes(n) {
    var nodes = Array(n);
    for (var i = 0; i < n; i++) {
        nodes[i] = { id: i };
    }
    return nodes;
}
exports.graph_empty_nodes = graph_empty_nodes;
function graph_empty(n, directed) {
    return (0, graph_1.graph)(graph_empty_nodes(n), [], directed);
}
exports.graph_empty = graph_empty;
