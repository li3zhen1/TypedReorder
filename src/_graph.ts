import { DistanceFunction } from "./distance";
import { LinkDistance } from "./graph";
export type Order = number[];
interface Tree {
}
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
export interface Graph<N extends NodeLike = NodeLike, L extends LinkLike<N> = LinkLike<N>> {
    nodes<NewNodeType extends NodeLike>(x: NewNodeType[]): Graph<NewNodeType, LinkLike<NewNodeType>>;
    nodes(): N[];
    nodes_indices(): number[];
    generate_nodes(n: number): Graph<N, L>;
    links(): L[];
    links<NewLinkType extends LinkLike<N>>(x: NewLinkType[]): Graph<N, NewLinkType>;
    links_indices(): {
        source: number;
        target: number;
    }[];
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
export {};
