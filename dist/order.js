"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.order = void 0;
var distance_1 = require("./distance");
var optimal_leaf_order_1 = require("./optimal_leaf_order");
var dist_1 = require("./dist");
var debug_1 = require("./debug");
var range_1 = require("./range");
var permutation_1 = require("./permutation");
function order() {
    var distance = distance_1.distance.euclidean;
    var ordering = optimal_leaf_order_1.optimal_leaf_order;
    var linkage = 'complete';
    var distanceMatrix = null;
    var vector;
    var except = [];
    var _debug = 0;
    var i = 0;
    var j = Infinity;
    function _reset() {
        distance = distance_1.distance.euclidean;
        ordering = optimal_leaf_order_1.optimal_leaf_order;
        linkage = 'complete';
        distanceMatrix = null;
        vector = null;
        except = [];
        i = 0;
        j = Infinity;
    }
    function debug(v) {
        if (arguments.length != 0) {
            _debug = v;
        }
        return _debug;
    }
    function order(v) {
        vector = v;
        j = Math.min(j, v.length);
        var i0 = i > 0 ? i - 1 : 0;
        var j0 = j < vector.length ? j + 1 : j;
        for (var k = except.length - 1; k > 0; k -= 2) {
            var low = except[k - 1];
            var high = except[k];
            if (high >= j0) {
                if (j0 > j) {
                    j0 = Math.min(j0, low + 1);
                    except.splice(k - 1, 2);
                }
                else {
                    high = j0;
                }
            }
            else if (low <= i0) {
                if (i0 < i) {
                    i0 = Math.max(i0, high - 1);
                    except.splice(k - 1, 2);
                }
                else {
                    low = i0;
                }
            }
            else if (high - low < 3) {
                except.splice(k - 1, 2);
            }
        }
        try {
            return _order_limits(i0, j0);
        }
        finally {
            _reset();
        }
    }
    function _order_limits(i0, j0) {
        var orig = vector;
        vector = vector.slice(i0, j0); // always make a copy
        if (i === 0 && j == vector.length) {
            return _order_except();
        }
        if (_debug) {
            console.log("i0=".concat(i0, " j0=").concat(j0));
        }
        if (distanceMatrix !== null) {
            if (j0 !== vector.length) {
                (0, dist_1.dist_remove)(distanceMatrix, j0, vector.length);
            }
            if (i0 > 0) {
                (0, dist_1.dist_remove)(distanceMatrix, 0, i0);
            }
        }
        else {
            _compute_dist();
        }
        // Apply constraints on the min/max indices
        var max = (0, dist_1.distmax)(distanceMatrix);
        if (i0 < i) {
            // row i0 should be far away from each rows so move it away
            // by changing the distance matrix, adding "max" to each
            // distance from row/column 0
            var row = distanceMatrix[0];
            for (var k = row.length; k-- > 1;) {
                row[k] += max;
            }
            for (var k = distanceMatrix.length; k-- > 1;) {
                distanceMatrix[k][0] += max;
            }
            max += max;
            // also fix the exception list
            if (i0 !== 0) {
                for (var k = 0; k < except.length; k++) {
                    except[k] -= i0;
                }
            }
        }
        if (j0 > j) {
            // move j0 even farther so that
            // i0 and j0 are farthest from each other.
            // add 2*max to each distance from row/col
            // j-i-1
            var l = distanceMatrix.length - 1;
            var row = distanceMatrix[l];
            for (var k = l; k-- > 0;) {
                row[k] += max;
                distanceMatrix[k][l] += max;
            }
        }
        // the algorithm should work as is, except
        // the order can be reversed in the end.
        var perm = _order_except();
        if (i0 < i) {
            if (perm[0] !== 0) {
                perm.reverse();
            }
            if (j0 > j) {
                (0, debug_1.assert)(perm[0] === 0 && perm[perm.length - 1] == perm.length - 1, 'Invalid constrained permutation endpoints');
            }
            else {
                (0, debug_1.assert)(perm[0] === 0, 'Invalid constrained permutation start');
            }
        }
        else if (j0 > j) {
            if (perm[perm.length - 1] !== perm.length - 1) {
                perm = perm.reverse();
            }
            (0, debug_1.assert)(perm[perm.length - 1] == perm.length - 1, 'Invalid constrained permutation end');
        }
        if (i0 !== 0) {
            perm = (0, permutation_1.permutation)(i0).concat(perm.map(function (v) { return v + i0; }));
        }
        if (orig.length > j0) {
            perm = perm.concat((0, range_1.range)(j0, orig.length));
        }
        return perm;
    }
    function _order_except() {
        var perm, k, l, low, high, pos;
        if (except.length === 0) {
            return _order_equiv();
        }
        // TODO: postpone the calculation to avoid computing the except items
        _compute_dist();
        // Apply constaints on the fixed order between the indices
        // in "except"
        // We do it end-to-start to keep the indices right
        for (k = except.length - 1; k > 0; k -= 2) {
            low = except[k - 1];
            high = except[k];
            distanceMatrix = (0, dist_1.dist_remove)(distanceMatrix, low + 1, high - 1);
            vector.splice(low + 1, high - low - 2);
            if (_debug) {
                console.log("Except[".concat(low, ", ").concat(high, "]"));
            }
            if (distanceMatrix[low][low + 1] !== 0) {
                // boundaries are equal, they will survive
                distanceMatrix[low][low + 1] = distanceMatrix[low + 1][low] = -1;
            }
        }
        perm = _order_equiv();
        // put back except ranges
        //TODO
        for (k = 0; k < except.length; k += 2) {
            low = except[k];
            high = except[k + 1];
            // Prepare for inserting range [low+1,high-1]
            for (l = 0; l < perm.length; l++) {
                if (perm[l] > low) {
                    perm[l] += high - low - 2;
                }
                else if (perm[l] == low) {
                    pos = l;
                }
            }
            if (pos > 0 && perm[pos - 1] == high - 1) {
                // reversed order
                Array.prototype.splice.apply(perm, [pos, 0].concat((0, range_1.range)(high - 2, low, -1)));
            }
            else if (perm[pos + 1] == high - 1) {
                Array.prototype.splice.apply(perm, [pos + 1, 0].concat((0, range_1.range)(low + 1, high - 1)));
            }
            else {
                throw 'Range not respected';
            }
        }
        return perm;
    }
    function _order_equiv() {
        var perm;
        var row;
        var e;
        var j;
        var k;
        var l;
        var m;
        var n;
        var has_1 = false;
        var equiv = [];
        var fix_except = {};
        _compute_dist();
        // Collect nodes with distance==0 in equiv table
        // At this stage, exceptions are stored with -1
        for (k = 0; k < distanceMatrix.length - 1; k++) {
            row = distanceMatrix[k];
            e = [];
            j = row.indexOf(-1);
            if (j !== -1) {
                fix_except[k] = [k, j]; // keep track for later fix
                has_1 = true;
            }
            // top down to keep the indices
            for (l = row.length; --l > k;) {
                if (row[l] === 0) {
                    j = distanceMatrix[l].indexOf(-1);
                    if (j !== -1) {
                        // move the constraint to the representative
                        // of the equiv. class "k"
                        fix_except[k] = [l, j]; // keep track for later fix
                        distanceMatrix[j][k] = row[j] = -1;
                        has_1 = true;
                    }
                    e.unshift(l);
                    // remove equivalent item from dist and vector
                    distanceMatrix = (0, dist_1.dist_remove)(distanceMatrix, l);
                    vector.splice(l, 1);
                }
                else if (row[l] < 0) {
                    has_1 = true;
                }
            }
            if (e.length !== 0) {
                e.unshift(k);
                equiv.push(e);
            }
        }
        if (has_1) {
            for (k = 0; k < distanceMatrix.length - 1; k++) {
                row = distanceMatrix[k];
                for (l = k + 1; l < row.length - 1; l++) {
                    if (distanceMatrix[l][l + 1] == -1) {
                        distanceMatrix[l + 1][l] = distanceMatrix[l][l + 1] = 0;
                    }
                }
            }
        }
        perm = _order();
        // put back equivalent rows
        for (k = equiv.length; k-- > 0;) {
            e = equiv[k];
            l = perm.indexOf(e[0]);
            m = fix_except[e[0]];
            if (m && m[0] == e[0]) {
                l = _fix_exception(perm, l, m[0], m[1], 0);
                m = undefined;
            }
            for (n = 1; n < e.length; n++) {
                perm = _perm_insert(perm, l, e[n]);
                if (m && m[0] == e[n]) {
                    l = _fix_exception(perm, l, m[0], m[1], n);
                    m = undefined;
                }
            }
        }
        // // put back equivalent rows
        // //TODO fix index that varies when insertions are done in the perm
        // for (k = equiv.length; k-- > 0; ) {
        //     e = equiv[k];
        //     l = perm.indexOf(e[0]);
        // }
        return perm;
    }
    // @ts-ignore
    function _fix_exception(perm, l, m, next, len) {
        // let i, j, k;
        // for (k = 0; k < except.length; k += 2) {
        //     if (m == except[k]) {
        //         next = m+1;
        //         break;
        //     }
        //     else if (m == except[k]+1) {
        //         next = m-1;
        //         break;
        //     }
        // }
        // if (next == 0) {
        //     throw "Exception not found";
        //     return;
        // }
        if (l > 0 && perm[l - 1] == next) {
            _swap(perm, l, perm.indexOf(m));
            return l + 1;
        }
        else if (perm[l + len + 1] == next) {
            _swap(perm, l + len, perm.indexOf(m));
            return l;
        }
        else {
            throw 'Index not found';
        }
    }
    // @ts-ignore
    function _swap(perm, a, b) {
        if (a == b) {
            return;
        }
        var c = perm[a];
        perm[a] = perm[b];
        perm[b] = c;
    }
    function _order() {
        if (_debug > 1) {
            (0, debug_1.printmat)(distanceMatrix);
        }
        if (_debug > 2) {
            (0, debug_1.printmat)(vector);
        }
        var perm = ordering().linkage(linkage).distanceMatrix(distanceMatrix)(vector);
        if (_debug) {
            console.log("Permutation: ".concat(perm));
        }
        return perm;
    }
    // @ts-ignore
    function _perm_insert(perm, i, nv) {
        // @ts-ignore
        perm = perm.map(function (v) { return (v < nv ? v : v + 1); });
        perm.splice(i, 0, nv);
        return perm;
    }
    function _compute_dist() {
        if (distanceMatrix === null) {
            distanceMatrix = (0, dist_1.dist)().distance(distance)(vector);
        }
        return distanceMatrix;
    }
    order.debug = debug;
    // @ts-ignore
    order.distance = function (x) {
        if (!arguments.length) {
            return distance;
        }
        distance = x;
        return order;
    };
    // @ts-ignore
    order.linkage = function (x) {
        if (!arguments.length) {
            return linkage;
        }
        linkage = x;
        return order;
    };
    // @ts-ignore
    order.limits = function (x, y) {
        if (!arguments.length) {
            return [i, j];
        }
        i = x;
        j = y;
        return order;
    };
    // @ts-ignore
    order.except = function (list) {
        var i;
        if (!arguments.length) {
            return except.slice(0);
        }
        for (i = 1; i < list.length; i++) {
            if (list[i - 1] >= list[i]) {
                throw 'Invalid list, indices not sorted';
            }
        }
        except = list.slice(0);
        return order;
    };
    function orderExcept(vector, i, j) {
        var distanceMatrix = (0, dist_1.dist)().distance(distance)(vector);
        var k, l, rev = false, args, pos = -1;
        // Set a null distance to stick i/i+1 together
        // TODO: check if no other pair is also ==0
        distanceMatrix[i][i + 1] = 0;
        distanceMatrix[i + 1][i] = 0;
        var perm = ordering().distanceMatrix(distanceMatrix)(vector);
        pos = perm.indexOf(i);
        for (k = 0; k < perm.length; k++) {
            l = perm[k];
            if (l > i) {
                perm[k] += j - i - 2;
            }
        }
        if (pos !== 0 && perm[pos - 1] === j - 1) {
            rev = true;
        }
        if (rev) {
            perm.reverse();
            pos = perm.length - pos - 1;
        }
        args = [pos + 1, 0].concat((0, range_1.range)(i + 1, j - 1));
        Array.prototype.splice.apply(perm, args);
        return perm;
    }
    order.orderrowsexcept = orderExcept;
    return order;
}
exports.order = order;
