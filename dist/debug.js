"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printhcluster = exports.assert = exports.printmat = exports.printvec = exports.displaymat = void 0;
function displaymat(mat, rowperm, colperm) {
    console.log('Matrix:');
    for (var i = 0; i < mat.length; i++) {
        var row = rowperm ? mat[rowperm[i]] : mat[i];
        var str = '';
        for (var j = 0; j < row.length; j++) {
            var col = colperm ? row[colperm[j]] : row[j];
            str += col ? '*' : ' ';
        }
        console.log(str);
    }
}
exports.displaymat = displaymat;
function printvec(row, prec, colperm, line) {
    if (!line) {
        line = '';
    }
    for (var j = 0; j < row.length; j++) {
        if (line.length !== 0) {
            line += ', ';
        }
        if (colperm) {
            line += row[colperm[j]].toFixed(prec);
        }
        else {
            line += row[j].toFixed(prec);
        }
    }
    console.log(line);
}
exports.printvec = printvec;
function printmat(m, prec, rowperm, colperm) {
    if (!prec) {
        prec = 4;
    }
    for (var i = 0; i < m.length; i++) {
        var row = rowperm ? m[rowperm[i]] : m[i];
        printvec(row, prec, colperm, "".concat(i, ": "));
    }
}
exports.printmat = printmat;
function assert(v, msg) {
    if (!v) {
        console.log(msg);
        throw msg || 'Assertion failed';
    }
}
exports.assert = assert;
function printhcluster(cluster, indent) {
    if (cluster.left === null) {
        return "".concat(Array(indent + 1).join(' '), "id: ").concat(cluster.id);
    }
    return "".concat(Array(indent + 1).join(' '), "id: ").concat(cluster.id, ", dist: ").concat(cluster.dist, "\n").concat(printhcluster(cluster.left, indent + 1), "\n").concat(printhcluster(cluster.right, indent + 1));
}
exports.printhcluster = printhcluster;
