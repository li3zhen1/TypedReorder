"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.count_crossings = void 0;
var permutation_1 = require("./permutation");
var utils_1 = require("./utils");
var aliases_1 = require("./aliases");
// Wilhelm Barth, Petra Mutzel, Michael Jünger:
// Simple and Efficient Bilayer Cross Counting.
// J. Graph Algorithms Appl. 8(2): 179-194 (2004)
/*jshint loopfunc:true */
function count_crossings(graph, north, south) {
    var comp = (0, permutation_1.permutation)(graph.nodes().length);
    if (north === undefined) {
        north = comp.filter(function (n) { return graph.outDegree(n) !== 0; });
        south = comp.filter(function (n) { return graph.inDegree(n) !== 0; });
    }
    // Choose the smaller axis
    var invert = false;
    if (north.length < south.length) {
        var tmp = north;
        north = south;
        south = tmp;
        invert = true;
    }
    var south_inv = (0, permutation_1.inverse_permutation)(south);
    var southsequence = [];
    for (var i = 0; i < north.length; i++) {
        var n = invert
            ? graph.inEdges(north[i]).map(function (e) { return south_inv[e.target.index]; })
            : graph.outEdges(north[i]).map(function (e) { return south_inv[e.source.index]; });
        n.sort(utils_1.cmp_number);
        southsequence = southsequence.concat(n);
    }
    var firstIndex = 1;
    while (firstIndex < south.length) {
        firstIndex <<= 1;
    }
    var treeSize = 2 * firstIndex - 1;
    firstIndex -= 1;
    var tree = (0, aliases_1.zeroes)(treeSize);
    var crosscount = 0;
    for (var i = 0; i < southsequence.length; i++) {
        var index = southsequence[i] + firstIndex;
        tree[index]++;
        while (index > 0) {
            if (index % 2) {
                crosscount += tree[index + 1];
            }
            index = (index - 1) >> 1;
            tree[index]++;
        }
    }
    return crosscount;
}
exports.count_crossings = count_crossings;
