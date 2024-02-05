import { Graph, LinkLike, NodeLike } from "./_graph";
export type LinkDistance<N extends NodeLike, L extends LinkLike<N>> = number | ((link: L, index: number) => number);
export declare function graph<N extends NodeLike = NodeLike, L extends LinkLike<N> = LinkLike<N>>(): Graph<N, L>;
export declare function graph<N extends NodeLike = NodeLike, L extends LinkLike<N> = LinkLike<N>>(nodes: N[], links: L[], directed: boolean): Graph<N, L>;
//# sourceMappingURL=graph.d.ts.map