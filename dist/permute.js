"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permute_matrix = exports.permutetranspose = exports.permute_inplace = exports.permute = void 0;
function permute(list, perm) {
    var m = perm.length;
    var copy = list.slice();
    while (m--) {
        copy[m] = list[perm[m]];
    }
    return copy;
}
exports.permute = permute;
function permute_inplace(list, perm) {
    for (var i = 0; i < list.length; i++) {
        var j = perm[i];
        if (j < 0) {
            perm[i] = -1 - j;
            continue;
        }
        var v = i;
        while (j != i) {
            var tmp = list[j];
            list[j] = list[v];
            list[v] = tmp;
            v = j;
            var _tmp = perm[j];
            perm[j] = -1 - _tmp;
            j = _tmp;
        }
    }
    return list;
}
exports.permute_inplace = permute_inplace;
function permutetranspose(array, indexes) {
    var m = array.length;
    while (m-- > 0) {
        array[m] = permute(array[m], indexes);
    }
    return array;
}
exports.permutetranspose = permutetranspose;
function permute_matrix(matrix, row_perm, col_perm) {
    if (!col_perm) {
        col_perm = row_perm;
    }
    var permuted = [];
    for (var i = 0; i < matrix.length; i++) {
        permuted.push([]);
        for (var j = 0; j < matrix[0].length; j++) {
            permuted[i].push(matrix[row_perm[i]][col_perm[j]]);
        }
    }
    return permuted;
}
exports.permute_matrix = permute_matrix;
