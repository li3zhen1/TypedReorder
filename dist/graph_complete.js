"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.complete_graph = void 0;
var graph_1 = require("./graph");
var graph_empty_1 = require("./graph_empty");
function complete_graph(n, directed) {
    if (directed === void 0) { directed = false; }
    var nodes = (0, graph_empty_1.graph_empty_nodes)(n);
    var links = [];
    if (directed) {
        for (var i = 0; i < n; i++) {
            for (var j = 0; j < n; j++) {
                if (i != j) {
                    links.push({ source: i, target: j });
                }
            }
        }
    }
    else {
        for (var i = 0; i < n - 1; i++) {
            for (var j = i + 1; j < n; j++) {
                links.push({ source: i, target: j });
            }
        }
    }
    return (0, graph_1.graph)(nodes, links, directed).init();
}
exports.complete_graph = complete_graph;
