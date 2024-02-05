"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inverse_permutation = exports.permutation = void 0;
var range_1 = require("./range");
exports.permutation = range_1.range;
// function inverse_permutation(perm: number[], dense: boolean = false) {
//     const inv = dense ? Array(perm.length) : {};
//     for (let i = 0; i < perm.length; i++) {
//         inv[perm[i]] = i;
//     }
//     return inv;
// }
// // Overload signatures
// export function inverse_permutation(perm: number[], dense: false): { [key: number]: number };
// export function inverse_permutation(perm: number[], dense: true): number[];
// export function inverse_permutation(perm: number[]): { [key: number]: number };
// Implementation
function inverse_permutation(perm, dense) {
    if (dense === void 0) { dense = false; }
    var inv = dense ? Array(perm.length) : {};
    for (var i = 0; i < perm.length; i++) {
        inv[perm[i]] = i;
    }
    return inv;
}
exports.inverse_permutation = inverse_permutation;
