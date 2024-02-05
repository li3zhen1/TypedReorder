export type DistanceFunction = (a: number[], b: number[]) => number;
export type DistanceFunctionGenerator = (...args: any[]) => DistanceFunction;
export declare const distance: {
    readonly euclidean: DistanceFunction;
    readonly manhattan: DistanceFunction;
    readonly minkowski: (p: number) => DistanceFunction;
    readonly chebyshev: DistanceFunction;
    readonly hamming: DistanceFunction;
    readonly jaccard: DistanceFunction;
    readonly braycurtis: DistanceFunction;
    readonly morans: (matrix: number[][]) => DistanceFunction;
};
//# sourceMappingURL=distance.d.ts.map