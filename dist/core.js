"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.set_debug = exports.debug = exports.version = void 0;
exports.version = '[VI]{version}[/VI]'; // managed by rollup-plugin-version-injector
exports.debug = false;
function set_debug(v) {
    if (v === void 0) { v = true; }
    exports.debug = v;
}
exports.set_debug = set_debug;
