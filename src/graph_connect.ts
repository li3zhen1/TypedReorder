import { Graph, LinkLike, NodeLike } from './_graph';

export function graph_connect<N extends NodeLike, L extends LinkLike<N>>(graph: Graph<N, L>, comps: number[][]): Graph<N, L> {
  const links = graph.links();

  if (!comps) {
    comps = graph.components();
  }

  for (let i = 0; i < comps.length - 1; i++) {
    for (let j = i + 1; j < comps.length; j++) {
      links.push({ source: comps[i][0], target: comps[j][0] } as unknown as L);
    }
  }
  graph.links(links);
  return graph.init();
}
