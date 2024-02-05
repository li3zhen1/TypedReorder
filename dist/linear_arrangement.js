"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.linear_arrangement = void 0;
/*
 * Linear arrangement
 * The sum of: for each edge: the distance in the ordering between the endpoints
 *
 * @matrix: a permuted matrix
 */
function linear_arrangement(matrix) {
    var linarr = 0;
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[0].length; j++) {
            if (i !== j && matrix[i][j] > 0) {
                linarr += Math.abs(i - j);
            }
        }
    }
    return linarr;
}
exports.linear_arrangement = linear_arrangement;
