import { Queue } from './queue';
import { Graph, LinkLike, NodeLike } from "./_graph";
import { flatten, cmp_number } from './utils';

export function bfs<N extends NodeLike, L extends LinkLike<N>>(
    graph: Graph<N, L>, v: number, fn: (v: number, c: number) => void) {
    const q = new Queue<number>();
    const discovered: { [index: number]: boolean } = {};
    q.push(v);
    discovered[v] = true;
    fn(v, undefined);
    while (q.length) {
        v = q.shift();
        fn(v, v);
        const edges = graph.edges(v);
        for (let i = 0; i < edges.length; i++) {
            const e = edges[i];
            const v2 = graph.other(e, v).index;
            if (!discovered[v2]) {
                q.push(v2);
                discovered[v2] = true;
                fn(v, v2);
            }
        }
        fn(v, -1);
    }
}

export function bfs_distances<N extends NodeLike, L extends LinkLike<N>>(
    graph: Graph<N, L>, v: number) {
    const dist: { [index: number]: number } = {};
    dist[v] = 0;
    bfs(graph, v, (v, c) => {
        if (c >= 0 && v != c) {
            dist[c] = dist[v] + 1;
        }
    });
    return dist;
}

export function all_pairs_distance_bfs<N extends NodeLike, L extends LinkLike<N>>(
    graph: Graph<N, L>,  comps: number[][]) {
    if (!comps) {
        comps = [graph.nodes_indices()];
    }
    const nodes = comps.reduce(flatten).sort(cmp_number);
    const mat = Array(nodes.length);

    for (let i = 0; i < nodes.length; i++) {
        mat[i] = Array(nodes.length);
    }

    for (let i = 0; i < nodes.length; i++) {
        const dist = bfs_distances(graph, i);
        for (let j in dist) {
            mat[i][j] = dist[j];
            mat[j][i] = dist[j];
        }
    }

    return mat;
}
