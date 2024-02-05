"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bfs_order = void 0;
var bfs_1 = require("./bfs");
/*jshint loopfunc:true */
var bfs_order = function (graph, comps) {
    if (!comps) {
        comps = graph.components();
    }
    var order = [];
    for (var i = 0; i < comps.length; i++) {
        var comp = comps[i];
        (0, bfs_1.bfs)(graph, comp[0], function (v, c) {
            if (c >= 0 && v != c) {
                order.push(v);
            }
        });
    }
    return order;
};
exports.bfs_order = bfs_order;
