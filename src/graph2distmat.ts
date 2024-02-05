import { zeroes } from './aliases';
import { distmax } from './dist';
import { all_pairs_distance } from './all_pairs_distance';
import { permute } from './permute';
import { flatten } from './utils';
import { NodeLike, LinkLike, Graph, LeafOrder } from '_graph';

// Converts a graph with weighted edges (weight in l.value)
// into a distance matrix suitable for reordering with e.g.
// Optimal Leaf Ordering.

export function distmat2valuemat(distmat: number[][]): number[][] {
    const n = distmat.length;
    const valuemat = zeroes(n, n);
    const max_dist = distmax(distmat);

    for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {
            valuemat[j][i] = valuemat[i][j] = 1 + max_dist - distmat[i][j];
        }
    }
    return valuemat;
}

export function graph2valuemats<N extends NodeLike, L extends LinkLike<N>>(graph: Graph<N, L>, comps: number[][]): number[][][] {
    if (!comps) {
        comps = graph.components();
    }

    const dists = all_pairs_distance(graph, comps);
    return dists.map(distmat2valuemat);
}


// @ts-ignore
export function valuemats_reorder(valuemats, leaforder, comps) {
    let orders = valuemats.map(leaforder);

    if (comps) {
        // @ts-ignore
        orders = orders.map((d, i) => permute(comps[i], d));
    }
    return orders.reduce(flatten);
}