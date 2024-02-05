import { graph } from './graph';

export function graph_empty_nodes(n: number) {
  const nodes = Array(n);
  for (let i = 0; i < n; i++) {
    nodes[i] = { id: i };
  }
  return nodes;
}

export function graph_empty(n: number, directed: boolean) {
  return graph(graph_empty_nodes(n), [], directed);
}
