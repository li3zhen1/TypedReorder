"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graph2mat = void 0;
var aliases_1 = require("./aliases");
function graph2mat(graph, directed) {
    var nodes = graph.nodes();
    var links = graph.links();
    var n = nodes.length;
    var mat;
    if (!directed) {
        directed = graph.directed();
    }
    if (directed) {
        var rows = n;
        var cols = n;
        for (var i = n - 1; i >= 0; i--) {
            if (graph.inEdges(i).length !== 0) {
                break;
            }
            else {
                rows--;
            }
        }
        for (var i = n - 1; i >= 0; i--) {
            if (graph.outEdges(i).length !== 0) {
                break;
            }
            else {
                cols--;
            }
        }
        //console.log("Rows: "+rows+" Cols: "+cols);
        mat = (0, aliases_1.zeroes)(rows, cols);
        for (var i = 0; i < links.length; i++) {
            var l = links[i];
            mat[l.source.index][l.target.index] = l.value ? l.value : 1;
        }
    }
    else {
        mat = (0, aliases_1.zeroes)(n, n);
        for (var i = 0; i < links.length; i++) {
            var l = links[i];
            mat[l.source.index][l.target.index] = l.value ? l.value : 1;
            mat[l.target.index][l.source.index] = l.value ? l.value : 1;
        }
    }
    return mat;
}
exports.graph2mat = graph2mat;
