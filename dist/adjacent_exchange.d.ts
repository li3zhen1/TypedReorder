import { Graph, LinkLike, NodeLike } from "./_graph";
export declare function count_in_crossings<N extends NodeLike, L extends LinkLike<N>>(graph: Graph<N, L>, v: N | number, w: N | number, inv: number[]): number;
export declare function count_out_crossings<N extends NodeLike, L extends LinkLike<N>>(graph: Graph<N, L>, v: N | number, w: N | number, inv: number[]): number;
/**
 * Optimize two layers by swapping adjacent nodes when
 * it reduces the number of crossings.
 * @param {Graph} graph - the graph these two layers belong to
 * @param {list} layer1 - the ordered list of nodes in layer 1
 * @param {list} layer2 - the ordered list of nodes in layer 2
 * @returns {list} a tuple containing the new layer1, layer2, and crossings count
 */
export declare function adjacent_exchange<N extends NodeLike, L extends LinkLike<N>>(graph: Graph<N, L>, layer1: number[], layer2: number[]): (number | number[])[];
//# sourceMappingURL=adjacent_exchange.d.ts.map