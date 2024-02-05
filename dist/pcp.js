"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parcoords_es = exports.parcoords = exports.pcp = exports.dicts_to_array = exports.array_to_dicts = void 0;
var range_1 = require("./range");
var core_1 = require("./core");
var correlation_1 = require("./correlation");
var optimal_leaf_order_1 = require("./optimal_leaf_order");
var permute_1 = require("./permute");
function array_to_dicts(data, axes) {
    if (axes === void 0) { axes = (0, range_1.range)(data[0].length); }
    var ret = [];
    for (var i = 0; i < data.length; i++) {
        var row = data[i];
        var dict = {};
        for (var j = 0; j < row.length; j++) {
            dict[axes[j]] = row[j];
        }
        ret.push(dict);
    }
    return ret;
}
exports.array_to_dicts = array_to_dicts;
function dicts_to_array(dicts, keys) {
    if (keys === void 0) { keys = Object.keys(dicts[0]); }
    var n = keys.length;
    var m = dicts.length;
    var array = Array(m);
    for (var i = 0; i < m; i++) {
        var row = Array(n);
        array[i] = row;
        for (var j = 0; j < n; j++) {
            row[j] = dicts[i][keys[j]];
        }
    }
    return array;
}
exports.dicts_to_array = dicts_to_array;
function abs_matrix(x) {
    return x.map(function (y) { return y.map(Math.abs); });
}
function pcp_flip_axes(perm, pcor) {
    var signs = [1];
    var sign = 1;
    var negs = 0;
    for (var i = 1; i < perm.length; i++) {
        var c = pcor[perm[i - 1]][perm[i]];
        if (c < 0) {
            sign = -sign;
        }
        if (sign < 0) {
            signs.push(-1);
            negs++;
        }
        else {
            signs.push(1);
        }
    }
    if (core_1.debug) {
        console.log(signs);
    }
    if (negs > perm.length / 2) {
        for (var i = 0; i < perm.length; i++) {
            signs[i] = -signs[i];
        }
    }
    return signs;
}
function pcp(tdata, axes) {
    if (axes === void 0) { axes = null; }
    if (!axes) {
        axes = (0, range_1.range)(tdata.length);
    }
    var pcor = correlation_1.correlation.pearsonMatrix(tdata);
    var abs_pcor = abs_matrix(pcor);
    var perm = (0, optimal_leaf_order_1.optimal_leaf_order)().distanceMatrix(abs_pcor)(tdata);
    var naxes = (0, permute_1.permute)(axes, perm);
    var signs = pcp_flip_axes(perm, pcor);
    return [naxes, signs, perm, pcor];
}
exports.pcp = pcp;
function parcoords(p) {
    p.detectDimensions().autoscale();
    var data = p.data();
    var types = p.types();
    var hidden = p.hideAxis();
    var yscale = p.yscale;
    var discarded = [];
    var tdata = [];
    var dimensions = p.dimensions();
    for (var i = 0; i < dimensions.length; i++) {
        var d = dimensions[i];
        if (hidden.includes(d)) {
            // remove dimension
            dimensions.splice(i, 1);
            discarded.push(d);
            i--;
        }
        else if (types[d] == 'number' || types[d] == 'date') {
            var row = [];
            var scale = yscale[d];
            for (var j = 0; j < data.length; j++) {
                row.push(scale(data[j][d]));
            }
            tdata.push(row);
        }
        else {
            // remove dimension
            dimensions.splice(i, 1);
            discarded.push(d);
            i--;
        }
    }
    var _a = pcp(tdata, dimensions), naxes = _a[0], signs = _a[1];
    // put back string and hidden columns
    dimensions = naxes.concat(discarded.reverse());
    p.dimensions(dimensions);
    p.hideAxis(hidden);
    for (var i = 0; i < signs.length; i++) {
        if (signs[i] < 0) {
            p.flip(dimensions[i]);
        }
    }
}
exports.parcoords = parcoords;
function parcoords_es(p) {
    var dimensions = p.dimensions();
    var data = p.data();
    var ignored = [];
    var axes = [];
    var tdata = [];
    for (var d in dimensions) {
        var val = dimensions[d];
        if (val.type == 'number' || val.type == 'date') {
            var row = [];
            var scale = val.yscale;
            for (var j = 0; j < data.length; j++) {
                row.push(scale(data[j][d]));
            }
            tdata.push(row);
            axes.push(d);
        }
        else {
            ignored.push(d);
        }
    }
    // @ts-ignore
    var _a = pcp(tdata, axes), naxes = _a[0], signs = _a[1];
    // @ts-ignore
    var ndomain = naxes.concat(ignored.reverse());
    // change the order in the xscale
    p.xscale.domain(ndomain);
    p.sortDimensions();
    for (var i = 0; i < signs.length; i++) {
        if (signs[i] < 0) {
            p.flip(ndomain[i]);
        }
    }
}
exports.parcoords_es = parcoords_es;
