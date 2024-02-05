import { Queue } from './queue';
import { inverse_permutation } from './permutation';
import { Graph, LinkLike, NodeLike } from '_graph';

/*jshint loopfunc:true */
export function cuthill_mckee<N extends NodeLike, L extends LinkLike<N>>(
    graph: Graph<N, L>, comp: number[]) {
    if (comp.length < 3) {
        return comp;
    }

    const visited: { [index: number]: boolean } = {};
    const queue = new Queue<number>();
    const inv = inverse_permutation(comp);
    const perm = [];

    let start = comp[0];
    let min_deg = graph.degree(start);

    for (let i = 0; i < comp.length; i++) {
        const n = comp[i];
        if (graph.degree(n) < min_deg) {
            min_deg = graph.degree(n);
            start = n;
            if (min_deg == 1) {
                break;
            }
        }
    }
    queue.push(start);
    while (queue.length !== 0) {
        const n = queue.shift();
        if (visited[n]) {
            continue;
        }
        visited[n] = true;
        perm.push(n);
        const e = graph
            .edges(n)
            .map((edge) => graph.other(edge, n).index)
            .filter((n) => !visited[n] && n in inv)
            // ascending by degree
            .sort((a, b) => graph.degree(a) - graph.degree(b));

        e.forEach(queue.push, queue);
    }
    return perm;
}

export function reverse_cuthill_mckee<N extends NodeLike, L extends LinkLike<N>>(
    graph: Graph<N, L>, comp: number[]) {
    return cuthill_mckee(graph, comp).reverse();
}

export function cuthill_mckee_order<N extends NodeLike, L extends LinkLike<N>>(
    graph: Graph<N, L>, comps: number[][]) {
    let comp: number[];
    let order:  number[] = [];

    if (!comps) {
        comps = graph.components();
    }
    for (let i = 0; i < comps.length; i++) {
        comp = comps[i];
        order = order.concat(cuthill_mckee(graph, comp));
    }
    return order;
}

export function reverse_cuthill_mckee_order<N extends NodeLike, L extends LinkLike<N>>(
    graph: Graph<N, L>, comps: number[][]) {
    let comp: number[];
    let order: number[] = [];

    if (!comps) {
        comps = graph.components();
    }
    for (let i = 0; i < comps.length; i++) {
        comp = comps[i];
        order = order.concat(reverse_cuthill_mckee(graph, comp));
    }
    return order;
}
