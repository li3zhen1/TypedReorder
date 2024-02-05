"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fix_distance_matrix = exports.check_distance_matrix = exports.array1d = exports.infinities = exports.flatten = exports.cmp_number_desc = exports.cmp_number = exports.cmp_number_asc = void 0;
// Use as: [4,3,2].sort(cmp_number_asc);
function cmp_number_asc(a, b) {
    return a - b;
}
exports.cmp_number_asc = cmp_number_asc;
exports.cmp_number = cmp_number_asc;
// Use as: [4,3,2].sort(cmp_number_desc);
function cmp_number_desc(a, b) {
    return b - a;
}
exports.cmp_number_desc = cmp_number_desc;
// Use as: [[4,3],[2]].reduce(flaten);
function flatten(a, b) {
    return a.concat(b);
}
exports.flatten = flatten;
// Constructs a multi-dimensional array filled with Infinity.
function infinities(n) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var i = -1;
    var a = [];
    if (arguments.length === 1) {
        while (++i < n) {
            a[i] = Infinity;
        }
    }
    else {
        while (++i < n) {
            a[i] = infinities.apply(this, Array.prototype.slice.call(arguments, 1));
        }
    }
    return a;
}
exports.infinities = infinities;
function array1d(n, v) {
    var i = -1;
    var a = Array(n);
    while (++i < n) {
        a[i] = v;
    }
    return a;
}
exports.array1d = array1d;
function check_distance_matrix(mat, tol) {
    var n = mat.length;
    if (!tol) {
        tol = 1e-10;
    }
    if (n != mat[0].length) {
        return 'Inconsistent dimensions';
    }
    for (var i = 0; i < n - 1; i++) {
        var row = mat[i];
        var v1 = row[i];
        if (v1 < 0) {
            return "Negative value at diagonal ".concat(i);
        }
        if (v1 > tol) {
            return "Diagonal not zero at ".concat(i);
        }
        for (var j = 1; j < n; j++) {
            v1 = row[j];
            var v2 = mat[j][i];
            if (Math.abs(v1 - v2) > tol) {
                return "Inconsistency at ".concat(i, ",").concat(j);
            }
            if (v1 < 0) {
                return "Negative value at ".concat(i, ",").concat(j);
            }
            if (v2 < 0) {
                return "Negative value at ".concat(j, ",").concat(i);
            }
        }
    }
    return false;
}
exports.check_distance_matrix = check_distance_matrix;
function fix_distance_matrix(mat, tol) {
    var n = mat.length;
    if (!tol) {
        tol = 1e-10;
    }
    if (n != mat[0].length) {
        throw "Inconsistent dimensions ".concat(n, " != ").concat(mat[0].length);
    }
    for (var i = 0; i < n - 1; i++) {
        var row = mat[i];
        var v1 = row[i];
        if (v1 < 0) {
            if (-v1 > tol) {
                throw "Negative value at diagonal".concat(i);
            }
            v1 = row[i] = 0;
        }
        else if (v1 > tol) {
            throw "Diagonal not zero at ".concat(i);
        }
        for (var j = 1; j < n; j++) {
            v1 = row[j];
            var v2 = mat[j][i];
            if (Math.abs(v1 - v2) > tol) {
                throw "Inconsistency at ".concat(i, ",").concat(j);
            }
            if (v1 < 0) {
                v1 = 0;
            }
            if (v2 < 0) {
                v2 = 0;
            }
            if (v1 != v2) {
                v1 += v2;
                v1 /= 2;
            }
            row[j] = v1;
            mat[j][i] = v1;
        }
    }
    return mat;
}
exports.fix_distance_matrix = fix_distance_matrix;
