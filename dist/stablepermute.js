"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stablepermute = void 0;
var permute_1 = require("./permute");
function stablepermute(list, indexes) {
    var p = (0, permute_1.permute)(list, indexes);
    if (p[0] > p[p.length - 1]) {
        p.reverse();
    }
    return p;
}
exports.stablepermute = stablepermute;
