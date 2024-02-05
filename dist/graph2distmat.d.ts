import { NodeLike, LinkLike, Graph } from "./_graph";
import { OptimalLeafOrder } from './optimal_leaf_order';
export declare function distmat2valuemat(distmat: number[][]): number[][];
export declare function graph2valuemats<N extends NodeLike, L extends LinkLike<N>>(graph: Graph<N, L>, comps: number[][]): number[][][];
export declare function valuemats_reorder(valuemats: number[][][], leaforder: OptimalLeafOrder, comps?: number[][]): number[];
//# sourceMappingURL=graph2distmat.d.ts.map