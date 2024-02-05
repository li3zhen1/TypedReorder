import { DistanceFunction } from './distance';
/**
 * optimal dendrogram ordering
 *
 * implementation of binary tree ordering described in [Bar-Joseph et al., 2003]
 * by Renaud Blanch.
 * JavaScript translation by Jean-Daniel Fekete.
 *
 * [Bar-Joseph et al., 2003]
 * K-ary Clustering with Optimal Leaf Ordering for Gene Expression Data.
 * Ziv Bar-Joseph, Erik D. Demaine, David K. Gifford, Angèle M. Hamel,
 * Tommy S. Jaakkola and Nathan Srebro
 * Bioinformatics, 19(9), pp 1070-8, 2003
 * http://www.cs.cmu.edu/~zivbj/compBio/k-aryBio.pdf
 */
export type TreeLeaf = {
    id: number;
    depth: number;
    left: TreeLeaf;
    right: TreeLeaf;
};
export interface OptimalLeafOrder {
    (matrix: number[][]): number[];
    order: (v: TreeLeaf) => number[];
    reorder: (matrix: number[][]) => number[];
    distance(): DistanceFunction;
    distance(x: DistanceFunction): OptimalLeafOrder;
    linkage(): string;
    linkage(x: string): OptimalLeafOrder;
    distance_matrix(): number[][];
    distance_matrix(x: number[][]): OptimalLeafOrder;
    distanceMatrix(): number[][];
    distanceMatrix(x: number[][]): OptimalLeafOrder;
}
export declare function optimal_leaf_order(): OptimalLeafOrder;
//# sourceMappingURL=optimal_leaf_order.d.ts.map