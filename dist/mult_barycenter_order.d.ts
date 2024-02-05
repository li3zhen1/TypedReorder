import { Graph, LinkLike, NodeLike } from "./_graph";
export declare function mult_barycenter_order<N extends NodeLike, L extends LinkLike<N>>(graphs: Graph<N, L>[], comps: number[][], max_iter: number): [number[], number[], number];
export declare function count_all_crossings<N extends NodeLike, L extends LinkLike<N>>(graphs: Graph<N, L>[], layer1: number[], layer2: number[]): number;
export declare function mult_barycenter<N extends NodeLike, L extends LinkLike<N>>(graphs: Graph<N, L>[], comp: number[], max_iter: number): [number[], number[], number];
//# sourceMappingURL=mult_barycenter_order.d.ts.map