import { DistanceFunction } from "distance";
import { LinkDistance } from "graph";


export type Order = number[];
interface Tree { }
export interface LeafOrder {
    order(root: Tree): Order;
    distance(dist: DistanceFunction): LeafOrder;
    distance(): DistanceFunction;
    linkage(linkage: string): LeafOrder;
    linkage(): string;
    distance_matrix(matrix: number[][]): LeafOrder;
    reorder(matrix: number[][]): Order;
}

export interface NodeLike {
    id?: number;
    index: number;
    weight?: number;
    comp?: number;
}

export interface LinkLike<N extends NodeLike> {
    source: N;
    target: N;
    index: number;
    value?: number;
    distance?: number;
    [key: string]: any; 
}

// Graph structure definition
export interface Graph<N extends NodeLike, L extends LinkLike<N>> {
    nodes(x: N[]): Graph<N, L>;
    nodes(): N[];
    nodes_indices(): number[];
    generate_nodes(n: number): Graph<N, L>;
    links(): L[];
    links(x: L[]): Graph<N, L>;
    links_indices(): { source: number; target: number }[];
    linkDistance(): LinkDistance<N, L>;
    linkDistance(x: LinkDistance<N, L>): Graph<N, L>;
    directed(x: boolean): Graph<N, L>;
    directed(): boolean;
    init(): Graph<N, L>;
    edges(node: number | N): L[];
    degree(node: number | N): number;
    inEdges(node: number | N): L[];
    inDegree(node: number | N): number;
    outEdges(node: number | N): L[];
    outDegree(node: number | N): number;
    sinks(): number[];
    sources(): number[];
    distance(index: number | L): number;
    neighbors(node: number): N[];
    other(link: L, node: number): N;
    components(): number[][];
}
