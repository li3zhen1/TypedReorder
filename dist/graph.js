"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graph = void 0;
var core_1 = require("./core");
var utils_1 = require("./utils");
function graph(nodes, links, directed) {
    var graph = {};
    var linkDistance = 1;
    var edges;
    var inEdges;
    var outEdges;
    var components;
    graph.nodes = function (x) {
        if (!arguments.length) {
            return nodes;
        }
        nodes = x;
        return graph;
    };
    graph.nodes_indices = function () { return nodes.map(function (n) { return n.index; }); };
    graph.generate_nodes = function (n) {
        nodes = [];
        for (var i = 0; i < n; i++) {
            nodes.push({ id: i });
        }
        return graph;
    };
    graph.links = function (x) {
        if (!arguments.length) {
            return links;
        }
        links = x;
        return graph;
    };
    graph.links_indices = function () {
        return links.map(function (l) { return ({
            source: l.source.index,
            target: l.target.index,
        }); });
    };
    graph.linkDistance = function (x) {
        if (!arguments.length) {
            return linkDistance;
        }
        linkDistance = typeof x === 'function' ? x : +x;
        return graph;
    };
    graph.directed = function (x) {
        if (!arguments.length) {
            return directed;
        }
        directed = x;
        return graph;
    };
    function init() {
        var n = nodes.length;
        var m = links.length;
        components = undefined;
        for (var i = 0; i < n; ++i) {
            var o = nodes[i];
            o.index = i;
            o.weight = 0;
        }
        for (var i = 0; i < m; ++i) {
            var o = links[i];
            o.index = i;
            if (typeof o.source == 'number') {
                o.source = nodes[o.source];
            }
            if (typeof o.target == 'number') {
                o.target = nodes[o.target];
            }
            if (!('value' in o)) {
                o.value = 1;
            }
            o.source.weight++;
            o.target.weight++;
        }
        if (typeof linkDistance === 'function') {
            for (var i = 0; i < m; ++i) {
                links[i].distance = +linkDistance.call(this, links[i], i);
            }
        }
        else {
            for (var i = 0; i < m; ++i) {
                links[i].distance = linkDistance;
            }
        }
        edges = Array(nodes.length);
        for (var i = 0; i < nodes.length; ++i) {
            edges[i] = [];
        }
        if (directed) {
            inEdges = Array(nodes.length);
            outEdges = Array(nodes.length);
            for (var i = 0; i < nodes.length; ++i) {
                inEdges[i] = [];
                outEdges[i] = [];
            }
        }
        else {
            inEdges = outEdges = edges;
        }
        for (var i = 0; i < links.length; ++i) {
            var o = links[i];
            edges[o.source.index].push(o);
            if (o.source.index != o.target.index) {
                edges[o.target.index].push(o);
            }
            if (directed) {
                inEdges[o.source.index].push(o);
            }
            if (directed) {
                outEdges[o.target.index].push(o);
            }
        }
        return graph;
    }
    graph.init = init;
    graph.edges = function (node) {
        if (typeof node != 'number') {
            node = node.index;
            if (core_1.debug) {
                console.log('received node %d', node);
            }
        }
        return edges[node];
    };
    graph.degree = function (node) {
        if (typeof node != 'number') {
            node = node.index;
        }
        return edges[node].length;
    };
    graph.inEdges = function (node) {
        if (typeof node != 'number') {
            node = node.index;
        }
        return inEdges[node];
    };
    graph.inDegree = function (node) {
        if (typeof node != 'number') {
            node = node.index;
        }
        return inEdges[node].length;
    };
    graph.outEdges = function (node) {
        if (typeof node != 'number') {
            node = node.index;
        }
        return outEdges[node];
    };
    graph.outDegree = function (node) {
        if (typeof node != 'number') {
            node = node.index;
        }
        return outEdges[node].length;
    };
    graph.sinks = function () {
        var sinks = [];
        for (var i = 0; i < nodes.length; i++) {
            if (graph.outEdges(i).length === 0) {
                sinks.push(i);
            }
        }
        return sinks;
    };
    graph.sources = function () {
        var sources = [];
        for (var i = 0; i < nodes.length; i++) {
            if (graph.inEdges(i).length === 0) {
                sources.push(i);
            }
        }
        return sources;
    };
    function distance(i) {
        return links[i].distance;
    }
    graph.distance = distance;
    function neighbors(node) {
        var e = edges[node];
        var ret = [];
        for (var _i = 0, e_1 = e; _i < e_1.length; _i++) {
            var o = e_1[_i];
            if (o.source.index == node) {
                ret.push(o.target);
            }
            else {
                ret.push(o.source);
            }
        }
        return ret;
    }
    graph.neighbors = neighbors;
    graph.other = function (o, node) {
        if (typeof o === 'number') {
            o = links[o];
        }
        if (o.source.index === node) {
            return o.target;
        }
        else {
            return o.source;
        }
    };
    function compute_components() {
        var stack = [];
        var comps = [];
        var n = nodes.length;
        for (var i = 0; i < n; i++) {
            nodes[i].comp = 0;
        }
        for (var j = 0, comp = 0; j < n; j++) {
            if (nodes[j].comp !== 0) {
                continue;
            }
            comp = comp + 1; // next connected component
            nodes[j].comp = comp;
            stack.push(j);
            var ccomp = [j]; // current connected component list
            while (stack.length) {
                var v = stack.shift();
                var l = edges[v];
                for (var i = 0; i < l.length; i++) {
                    var e = l[i];
                    var o = e.source;
                    if (o.index == v) {
                        o = e.target;
                    }
                    if (o.index == v) {
                        continue;
                    }
                    if (o.comp === 0) {
                        o.comp = comp;
                        ccomp.push(o.index);
                        stack.push(o.index);
                    }
                }
            }
            if (ccomp.length) {
                ccomp.sort(utils_1.cmp_number);
                comps.push(ccomp);
            }
        }
        comps.sort(function (a, b) { return b.length - a.length; });
        return comps;
    }
    graph.components = function () {
        if (!components) {
            components = compute_components();
        }
        return components;
    };
    return graph;
}
exports.graph = graph;
