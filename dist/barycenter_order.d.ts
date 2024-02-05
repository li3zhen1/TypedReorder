import { Graph, LinkLike, NodeLike } from "./_graph";
export declare function barycenter_order<N extends NodeLike, L extends LinkLike<N>>(graph: Graph<N, L>, comps: number[][], max_iter: number): [number[], number[], number];
export declare function barycenter<N extends NodeLike, L extends LinkLike<N>>(graph: Graph<N, L>, comp: number[], max_iter: number): [number[], number[], number];
//# sourceMappingURL=barycenter_order.d.ts.map