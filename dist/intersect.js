"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.intersect_sorted_ints = void 0;
function intersect_sorted_ints(a, b) {
    var ai = 0;
    var bi = 0;
    var result = [];
    while (ai < a.length && bi < b.length) {
        if (a[ai] < b[bi]) {
            ai++;
        }
        else if (a[ai] > b[bi]) {
            bi++;
        }
        else {
            /* they're equal */
            result.push(ai);
            ai++;
            bi++;
        }
    }
    return result;
}
exports.intersect_sorted_ints = intersect_sorted_ints;
