"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graph_connect = void 0;
function graph_connect(graph, comps) {
    var links = graph.links();
    if (!comps) {
        comps = graph.components();
    }
    for (var i = 0; i < comps.length - 1; i++) {
        for (var j = i + 1; j < comps.length; j++) {
            links.push({ source: comps[i][0], target: comps[j][0] });
        }
    }
    graph.links(links);
    return graph.init();
}
exports.graph_connect = graph_connect;
