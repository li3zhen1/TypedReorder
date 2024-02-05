"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graph_random = exports.graph_random_erdos_renyi = void 0;
var graph_empty_1 = require("./graph_empty");
var graph_complete_1 = require("./graph_complete");
var graph_1 = require("./graph");
function graph_random_erdos_renyi(n, p, directed) {
    if (p <= 0) {
        return (0, graph_empty_1.graph_empty)(n, directed);
    }
    else if (p >= 1) {
        return (0, graph_complete_1.complete_graph)(n, directed);
    }
    var nodes = (0, graph_empty_1.graph_empty_nodes)(n);
    var links = [];
    var w = -1;
    var lp = Math.log(1.0 - p);
    if (directed) {
        for (var v = 0; v < n;) {
            var lr = Math.log(1.0 - Math.random());
            w = w + 1 + Math.floor(lr / lp);
            if (v == w) {
                w = w + 1;
            }
            while (w >= n && v < n) {
                w = w - n;
                v = v + 1;
                if (v == w) {
                    w = w + 1;
                }
            }
            if (v < n) {
                links.push({ source: v, target: w });
            }
        }
    }
    else {
        for (var v = 1; v < n;) {
            var lr = Math.log(1.0 - Math.random());
            w = w + 1 + Math.floor(lr / lp);
            while (w >= v && v < n) {
                w = w - v;
                v = v + 1;
            }
            if (v < n) {
                links.push({ source: v, target: w });
            }
        }
    }
    return (0, graph_1.graph)(nodes, links, directed).init();
}
exports.graph_random_erdos_renyi = graph_random_erdos_renyi;
exports.graph_random = graph_random_erdos_renyi;
