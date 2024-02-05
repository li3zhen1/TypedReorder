import { debug } from './core';
import { Graph, LinkLike, NodeLike } from '_graph';
import { cmp_number } from './utils';

export type LinkDistance<N extends NodeLike, L extends LinkLike<N>> = number |( (link: L, index: number) => number)

export function graph<N extends NodeLike, L extends LinkLike<N>>(
    nodes: N[], links: L[], directed: boolean) {
    const graph = {} as Graph<N, L>;
    let linkDistance: LinkDistance<N, L> = 1;
    let edges: L[][];
    let inEdges: L[][];
    let outEdges: L[][];
    let components: number[][];

    graph.nodes = function (x?: N[]) {
        if (!arguments.length) {
            return nodes;
        }
        nodes = x;
        return graph;
    } as any;

    graph.nodes_indices = () => nodes.map((n) => n.index);

    graph.generate_nodes = (n) => {
        nodes = [];
        for (let i = 0; i < n; i++) {
            nodes.push({ id: i } as N);
        }
        return graph;
    };

    graph.links = function (x?: L[]) {
        if (!arguments.length) {
            return links;
        }
        links = x;
        return graph;
    } as any;

    graph.links_indices = () =>
        links.map((l) => ({
            source: l.source.index,
            target: l.target.index,
        }));

    graph.linkDistance = function (x?: LinkDistance<N, L>) {
        if (!arguments.length) {
            return linkDistance;
        }
        linkDistance = typeof x === 'function' ? x : +x;
        return graph;
    } as any;

    graph.directed = function (x?: boolean) {
        if (!arguments.length) {
            return directed;
        }
        directed = x;
        return graph;
    } as any;

    function init() {
        const n = nodes.length;
        const m = links.length;

        components = undefined;
        for (let i = 0; i < n; ++i) {
            const o = nodes[i];
            o.index = i;
            o.weight = 0;
        }

        for (let i = 0; i < m; ++i) {
            const o = links[i];
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
            for (let i = 0; i < m; ++i) {
                links[i].distance = +linkDistance.call(this, links[i], i);
            }
        } else {
            for (let i = 0; i < m; ++i) {
                links[i].distance = linkDistance;
            }
        }

        edges = Array(nodes.length);
        for (let i = 0; i < nodes.length; ++i) {
            edges[i] = [];
        }

        if (directed) {
            inEdges = Array(nodes.length);
            outEdges = Array(nodes.length);
            for (let i = 0; i < nodes.length; ++i) {
                inEdges[i] = [];
                outEdges[i] = [];
            }
        } else {
            inEdges = outEdges = edges;
        }

        for (let i = 0; i < links.length; ++i) {
            const o = links[i];
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

    graph.edges = (node?: N | number) => {
        if (typeof node != 'number') {
            node = node.index;
            if (debug) {
                console.log('received node %d', node);
            }
        }
        return edges[node];
    };

    graph.degree = (node?: N | number) => {
        if (typeof node != 'number') {
            node = node.index;
        }
        return edges[node].length;
    };

    graph.inEdges = (node?: N | number) => {
        if (typeof node != 'number') {
            node = node.index;
        }
        return inEdges[node];
    };

    graph.inDegree = (node?: N | number) => {
        if (typeof node != 'number') {
            node = node.index;
        }
        return inEdges[node].length;
    };

    graph.outEdges = (node?: N | number) => {
        if (typeof node != 'number') {
            node = node.index;
        }
        return outEdges[node];
    };

    graph.outDegree = (node?: N | number) => {
        if (typeof node != 'number') {
            node = node.index;
        }
        return outEdges[node].length;
    };

    graph.sinks = () => {
        const sinks = [];
        for (let i = 0; i < nodes.length; i++) {
            if (graph.outEdges(i).length === 0) {
                sinks.push(i);
            }
        }
        return sinks;
    };

    graph.sources = () => {
        const sources = [];
        for (let i = 0; i < nodes.length; i++) {
            if (graph.inEdges(i).length === 0) {
                sources.push(i);
            }
        }
        return sources;
    };

    function distance(i: number) {
        return links[i].distance;
    }

    graph.distance = distance;

    function neighbors(node: number) {
        const e = edges[node];
        const ret = [];

        for (const o of e) {
            if (o.source.index == node) {
                ret.push(o.target);
            } else {
                ret.push(o.source);
            }
        }

        return ret;
    }
    graph.neighbors = neighbors;

    graph.other = (o: L, node: number) => {
        if (typeof o === 'number') {
            o = links[o];
        }
        if (o.source.index === node) {
            return o.target;
        } else {
            return o.source;
        }
    };

    function compute_components() {
        const stack: number[] = [];
        const comps: number[][] = [];
        const n = nodes.length;

        for (let i = 0; i < n; i++) {
            nodes[i].comp = 0;
        }

        for (let j = 0, comp = 0; j < n; j++) {
            if (nodes[j].comp !== 0) {
                continue;
            }
            comp = comp + 1; // next connected component
            nodes[j].comp = comp;
            stack.push(j);
            const ccomp = [j]; // current connected component list

            while (stack.length) {
                const v = stack.shift();
                const l = edges[v];
                for (let i = 0; i < l.length; i++) {
                    const e = l[i];
                    let o = e.source;
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
                ccomp.sort(cmp_number);
                comps.push(ccomp);
            }
        }
        comps.sort((a, b) => b.length - a.length);
        return comps;
    }

    graph.components = () => {
        if (!components) {
            components = compute_components();
        }
        return components;
    };

    return graph;
}
