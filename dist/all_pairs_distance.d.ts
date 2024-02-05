import { Graph, LinkLike, NodeLike } from "./_graph";
/**
 * Returns a list of distance matrices, computed for the specified
 * connected components of a graph, or all the components if none is
 * specified.
 * @param {Graph} graph - the graph
 * @param {Array} comps [optional] the specified connected component list
 * @returns {Array} a list of distance matrices, in the order of the
 * nodes in the list of connected components.
 */
export declare function all_pairs_distance<N extends NodeLike, L extends LinkLike<N>>(graph: Graph<N, L>, comps: number[][]): number[][][];
/**
 * Returns a distance matrix, computed for the specified
 * connected component of a graph.
 * @param {Graph} graph - the graph
 * @param {Array} comp - the connected component as a list of nodes
 * @returns {Matrix} a distance matrix, in the order of the
 * nodes in the list of connected components.
 */
export declare function all_pairs_distance_floyd_warshall<N extends NodeLike, L extends LinkLike<N>>(graph: Graph<N, L>, comp: number[]): number[][];
/**
 * Returns a distance matrix, computed for the specified
 * connected component of a graph, and the information to compute the
 * shortest paths.
 * @param {Graph} graph - the graph
 * @param {Array} comp - the connected component as a list of nodes
 * @returns {list} a distance matrix, in the order of the
 * nodes in the list of connected components, and a table used to
 * reconstruct the shortest paths with the {@link
 * floyd_warshall_path} function.
 */
export declare function floyd_warshall_with_path<N extends NodeLike, L extends LinkLike<N>>(graph: Graph<N, L>, comp: number[]): number[][];
/**
 * Returns the shortest path from node u to node v, from the table
 * returned by {@link floyd_warshall_with_path}.
 * @param {Array} next - the next information
 * @param {Integer} u - the starting node
 * @param {Integer} v - the ending node
 * @return {list} a list of nodes in the shortest path from u to v
 */
export declare function floyd_warshall_path(next: number[][], u: number, v: number): number[];
//# sourceMappingURL=all_pairs_distance.d.ts.map