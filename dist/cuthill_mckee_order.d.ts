import { Graph, LinkLike, NodeLike } from "./_graph";
export declare function cuthill_mckee<N extends NodeLike, L extends LinkLike<N>>(graph: Graph<N, L>, comp: number[]): number[];
export declare function reverse_cuthill_mckee<N extends NodeLike, L extends LinkLike<N>>(graph: Graph<N, L>, comp: number[]): number[];
export declare function cuthill_mckee_order<N extends NodeLike, L extends LinkLike<N>>(graph: Graph<N, L>, comps: number[][]): number[];
export declare function reverse_cuthill_mckee_order<N extends NodeLike, L extends LinkLike<N>>(graph: Graph<N, L>, comps: number[][]): number[];
//# sourceMappingURL=cuthill_mckee_order.d.ts.map