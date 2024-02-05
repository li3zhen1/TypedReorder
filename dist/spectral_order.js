"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spectral_order = void 0;
var fiedler_1 = require("./fiedler");
var laplacian_1 = require("./laplacian");
var sort_order_1 = require("./sort_order");
var permute_1 = require("./permute");
function spectral_order(graph, comps) {
    var order = [];
    if (!comps) {
        comps = graph.components();
    }
    for (var i = 0; i < comps.length; i++) {
        var comp = comps[i];
        var vec = (0, fiedler_1.fiedler_vector)((0, laplacian_1.laplacian)(graph, comp));
        var perm = (0, sort_order_1.sort_order)(vec);
        order = order.concat((0, permute_1.permute)(comp, perm));
    }
    return order;
}
exports.spectral_order = spectral_order;
