import { bfs } from './bfs';

import { Graph, LinkLike, NodeLike } from './_graph';


/*jshint loopfunc:true */
export const bfs_order = <N extends NodeLike, L extends LinkLike<N>>(graph: Graph<N, L>, comps: number[][]): number[] => {

    if (!comps) {
        comps = graph.components();
    }

    const order: number[] = [];

    for (let i = 0; i < comps.length; i++) {
        const comp = comps[i];
        bfs(graph, comp[0], (v, c) => {
            if (c >= 0 && v != c) {
                order.push(v);
            }
        });
    }

    return order;
};
