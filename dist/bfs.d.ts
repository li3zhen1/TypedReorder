import { Graph, LinkLike, NodeLike } from "./_graph";
export declare function bfs<N extends NodeLike, L extends LinkLike<N>>(graph: Graph<N, L>, v: number, fn: (v: number, c: number) => void): void;
export declare function bfs_distances<N extends NodeLike, L extends LinkLike<N>>(graph: Graph<N, L>, v: number): {
    [index: number]: number;
};
export declare function all_pairs_distance_bfs<N extends NodeLike, L extends LinkLike<N>>(graph: Graph<N, L>, comps: number[][]): any[];
//# sourceMappingURL=bfs.d.ts.map