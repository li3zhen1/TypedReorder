import { DistanceFunction } from './distance';
export declare function dist(): {
    (vectors: number[][]): number[][];
    distance(x: DistanceFunction): DistanceFunction | any;
};
export declare function distmax(distMatrix: number[][]): number;
export declare function distmin(distMatrix: number[][]): number;
export declare function dist_remove(dist: number[][], n: number, m?: number): number[][];
//# sourceMappingURL=dist.d.ts.map