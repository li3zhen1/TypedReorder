"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.correlation = void 0;
var aliases_1 = require("./aliases");
exports.correlation = {
    pearson: function (a, b) {
        var ma = (0, aliases_1.mean)(a);
        var mb = (0, aliases_1.mean)(b);
        var n = Math.min(a.length, b.length);
        if (n === 0) {
            return NaN;
        }
        var s1 = 0;
        var s2 = 0;
        var s3 = 0;
        for (var i = 0; i < n; i++) {
            var dx = a[i] - ma;
            var dy = b[i] - mb;
            s1 += dx * dy;
            s2 += dx * dx;
            s3 += dy * dy;
        }
        return s1 / Math.sqrt(s2 * s3);
    },
    pearsonMatrix: function (matrix) {
        var cor = exports.correlation.pearson;
        var n = matrix.length;
        if (n === 0) {
            return NaN;
        }
        // do it the hard way for now, we'll optimize later
        var ret = (0, aliases_1.zeroes)(n, n);
        for (var i = 0; i < n - 1; i++) {
            for (var j = i + 1; j < n; j++) {
                var p = cor(matrix[i], matrix[j]);
                ret[i][j] = ret[j][i] = p;
            }
        }
        return ret;
        // mx = Array(n);
        // sx = zeroes(n);
        // sx2 = zeroes(n);
        // for (i = 0; i < n; i++) {
        //     mx[i] = science.stats.mean(matrix[i]);
        // }
        // for (i = 0; i < n; i++) {
        //     a = matrix[i];
        //     ma = mx[i];
        //     for (j = 0; j < n; j++) {
        // 	dx = (a[j] - ma);
        // 	sx[j] += dx;
        // 	sx2[j] += dx*dx;
        //     }
        // }
        // for (i = 0; i < n; i++) {
        //     ret[i] = Array(n);
        //     for (j = 0; j < n; j++) {
        // 	ret[i][j] = sx[i]*sx[j]/Math.sqrt(sx2[i]*sx2[j]);
        //     }
        // }
        // return ret;
    },
};
