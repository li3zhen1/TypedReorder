"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sort_order_descending = exports.sort_order_ascending = exports.sort_order = void 0;
var permutation_1 = require("./permutation");
function sort_order(v) {
    return (0, permutation_1.permutation)(0, v.length).sort(function (a, b) { return v[a] - v[b]; });
}
exports.sort_order = sort_order;
exports.sort_order_ascending = sort_order;
function sort_order_descending(v) {
    return (0, permutation_1.permutation)(0, v.length).sort(function (a, b) { return v[b] - v[a]; });
}
exports.sort_order_descending = sort_order_descending;
