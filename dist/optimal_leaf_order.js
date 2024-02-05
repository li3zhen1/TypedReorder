"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optimal_leaf_order = void 0;
var distance_1 = require("./distance");
var core_1 = require("./core");
var hcluster_1 = require("./hcluster");
var debug_1 = require("./debug");
var dist_1 = require("./dist");
function optimal_leaf_order() {
    var distanceMatrix = null;
    var distance = distance_1.distance.euclidean;
    var linkage = 'complete';
    var leavesMap = {};
    var orderMap = {};
    function leaves(n) {
        if (n === null) {
            return [];
        }
        if (n.id in leavesMap) {
            return leavesMap[n.id];
        }
        return (leavesMap[n.id] = _leaves(n));
    }
    function _leaves(n) {
        if (n === null) {
            return [];
        }
        if (n.depth === 0) {
            return [n.id];
        }
        return leaves(n.left).concat(leaves(n.right));
    }
    function order(v, i, j) {
        var key = "k".concat(v.id, "-").concat(i, "-").concat(j); // ugly key
        if (key in orderMap) {
            return orderMap[key];
        }
        return (orderMap[key] = _order(v, i, j));
    }
    function _order(v, i, j) {
        if (v.depth === 0) {
            return [0, [v.id]];
        }
        var l = v.left;
        var r = v.right;
        var L = leaves(l);
        var R = leaves(r);
        var w, x;
        if (L.includes(i) && R.includes(j)) {
            w = l;
            x = r;
        }
        else if (R.includes(i) && L.includes(j)) {
            w = r;
            x = l;
        }
        else {
            throw { error: "Node is not common ancestor of ".concat(i, ", ").concat(j) };
        }
        var Wl = leaves(w.left);
        var Wr = leaves(w.right);
        var Ks = Wr.includes(i) ? Wl : Wr;
        if (Ks.length === 0) {
            Ks = [i];
        }
        var Xl = leaves(x.left);
        var Xr = leaves(x.right);
        var Ls = Xr.includes(j) ? Xl : Xr;
        if (Ls.length === 0) {
            Ls = [j];
        }
        var min = Infinity;
        var optimal_order = [];
        for (var k = 0; k < Ks.length; k++) {
            var w_min = order(w, i, Ks[k]);
            for (var m = 0; m < Ls.length; m++) {
                var x_min = order(x, Ls[m], j);
                var dist_2 = w_min[0] + distanceMatrix[Ks[k]][Ls[m]] + x_min[0];
                if (dist_2 < min) {
                    min = dist_2;
                    optimal_order = w_min[1].concat(x_min[1]);
                }
            }
        }
        return [min, optimal_order];
    }
    function orderFull(v) {
        leavesMap = {};
        orderMap = {};
        var min = Infinity;
        var optimal_order = [];
        var left = leaves(v.left);
        var right = leaves(v.right);
        if (core_1.debug) {
            console.log((0, debug_1.printhcluster)(v, 0));
        }
        for (var i = 0; i < left.length; i++) {
            for (var j = 0; j < right.length; j++) {
                var so = order(v, left[i], right[j]);
                if (so[0] < min) {
                    min = so[0];
                    optimal_order = so[1];
                }
            }
        }
        distanceMatrix = null;
        return optimal_order;
    }
    function optimal_leaf_order(matrix) {
        if (distanceMatrix === null) {
            distanceMatrix = (0, dist_1.dist)().distance(distance)(matrix);
        }
        var cluster = (0, hcluster_1.hcluster)().linkage(linkage).distanceMatrix(distanceMatrix);
        return orderFull(cluster(matrix));
    }
    optimal_leaf_order.order = orderFull;
    optimal_leaf_order.reorder = optimal_leaf_order;
    optimal_leaf_order.distance = function (x) {
        if (!arguments.length) {
            return distance;
        }
        distance = x;
        distanceMatrix = null;
        return optimal_leaf_order;
    };
    optimal_leaf_order.linkage = function (x) {
        if (!arguments.length) {
            return linkage;
        }
        linkage = x;
        return optimal_leaf_order;
    };
    optimal_leaf_order.distance_matrix = function (x) {
        if (!arguments.length) {
            return distanceMatrix;
        }
        distanceMatrix = x.map(function (y) { return y.slice(0); });
        return optimal_leaf_order;
    };
    optimal_leaf_order.distanceMatrix = optimal_leaf_order.distance_matrix; // compatibility
    return optimal_leaf_order;
}
exports.optimal_leaf_order = optimal_leaf_order;
