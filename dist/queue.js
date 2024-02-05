"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = void 0;
var Queue = /** @class */ (function () {
    function Queue() {
        this.length = 0;
    }
    Queue.prototype.push = function (item) {
        var node = { item: item };
        if (this.last) {
            this.last = this.last.next = node;
        }
        else {
            this.last = this.first = node;
        }
        this.length++;
    };
    Queue.prototype.shift = function () {
        var node = this.first;
        if (node) {
            this.first = node.next;
            if (!--this.length) {
                this.last = undefined;
            }
            return node.item;
        }
    };
    Queue.prototype.slice = function (start, end) {
        if (start === void 0) { start = 0; }
        if (end === void 0) { end = Infinity; }
        var output = [];
        var i = 0;
        for (var node = this.first; node; node = node.next) {
            if (--end < 0) {
                break;
            }
            else if (++i > start) {
                output.push(node.item);
            }
        }
        return output;
    };
    return Queue;
}());
exports.Queue = Queue;
