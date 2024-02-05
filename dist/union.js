"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.union = void 0;
// Computes the union of a list of matrices
function union(matrices) {
    var pile = [];
    for (var i = 0; i < matrices[0].length; i++) {
        if (!pile[i]) {
            pile.push([]);
        }
        for (var j = 0; j < matrices[0][0].length; j++) {
            if (pile[i].length < matrices[0][0].length) {
                pile[i].push(0);
            }
            for (var k = 0; k < matrices.length; k++) {
                pile[i][j] = pile[i][j] + matrices[k][i][j];
            }
        }
    }
    return pile;
}
exports.union = union;
