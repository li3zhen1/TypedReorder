"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.range = void 0;
function range(start, stop, step) {
    if (stop === void 0) { stop = start; }
    if (step === void 0) { step = 1; }
    if (arguments.length < 2) {
        stop = start;
        start = 0;
    }
    var range = [];
    var i = start;
    if (step < 0) {
        for (; i > stop; i += step) {
            range.push(i);
        }
    }
    else {
        for (; i < stop; i += step) {
            range.push(i);
        }
    }
    return range;
}
exports.range = range;
