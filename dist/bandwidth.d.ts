import { NodeLike, LinkLike, Graph } from "./_graph";
/**
 * Compute the bandwidth of a graph, given and order.
 * @param  {Graph} graph - the graph
 * @param {list} order - a permutation
 * @returns {integer} the bandwidth
 */
export declare function bandwidth<N extends NodeLike, L extends LinkLike<N>>(graph: Graph<N, L>, order: number[]): number;
/**
 * Compute the bandwidth of an adjacency matrix,
 * i.e. the maximum distace between two endpoints
 * over all edges.
 * @param  {Matrix} matrix - the matrix
 * @returns {integer} the bandwidth
 */
export declare function bandwidth_matrix(matrix: number[][]): number;
//# sourceMappingURL=bandwidth.d.ts.map