import { distance as distances } from './distance';
import { debug } from './core';
import { hcluster } from './hcluster';
import { printhcluster } from './debug';
import { dist } from './dist';

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

export function optimal_leaf_order() {
  let distanceMatrix: any = null;
  let distance = distances.euclidean;
  let linkage = 'complete';
  let leavesMap: any = {};
  let orderMap: any = {};

  function leaves(n: any): any {
    if (n === null) {
      return [];
    }
    if (n.id in leavesMap) {
      return leavesMap[n.id];
    }
    return (leavesMap[n.id] = _leaves(n));
  }

  // @ts-ignore
  function _leaves(n) {
    if (n === null) {
      return [];
    }
    if (n.depth === 0) {
      return [n.id];
    }
    return leaves(n.left).concat(leaves(n.right));
  }
  // @ts-ignore
  function order(v, i, j) {
    const key = `k${v.id}-${i}-${j}`; // ugly key
    if (key in orderMap) {
      return orderMap[key];
    }
    return (orderMap[key] = _order(v, i, j));
  }
  // @ts-ignore
  function _order(v, i, j) {
    if (v.depth === 0) {
      return [0, [v.id]];
    }
    const l = v.left;
    const r = v.right;
    const L = leaves(l);
    const R = leaves(r);

    let w, x;
    if (L.includes(i) && R.includes(j)) {
      w = l;
      x = r;
    } else if (R.includes(i) && L.includes(j)) {
      w = r;
      x = l;
    } else {
      throw { error: `Node is not common ancestor of ${i}, ${j}` };
    }
    const Wl = leaves(w.left);
    const Wr = leaves(w.right);
    let Ks = Wr.includes(i) ? Wl : Wr;
    if (Ks.length === 0) {
      Ks = [i];
    }

    const Xl = leaves(x.left);
    const Xr = leaves(x.right);
    let Ls = Xr.includes(j) ? Xl : Xr;
    if (Ls.length === 0) {
      Ls = [j];
    }

    let min = Infinity;
    let optimal_order = [];

    for (let k = 0; k < Ks.length; k++) {
      const w_min: any = order(w, i, Ks[k]);
      for (let m = 0; m < Ls.length; m++) {
        const x_min: any  = order(x, Ls[m], j);
        const dist = w_min[0] + distanceMatrix[Ks[k]][Ls[m]] + x_min[0];
        if (dist < min) {
          min = dist;
          optimal_order = w_min[1].concat(x_min[1]);
        }
      }
    }
    return [min, optimal_order];
  }

  function orderFull(v: any )  {
    leavesMap = {};
    orderMap = {};
    let min = Infinity;
    let optimal_order = [];
    const left = leaves(v.left);
    const right = leaves(v.right);

    if (debug) {
      console.log(printhcluster(v, 0));
    }

    for (let i = 0; i < left.length; i++) {
      for (let j = 0; j < right.length; j++) {
        const so = order(v, left[i], right[j]);
        if (so[0] < min) {
          min = so[0];
          optimal_order = so[1];
        }
      }
    }
    distanceMatrix = null;
    return optimal_order;
  }

  function optimal_leaf_order(matrix: any ) {
    if (distanceMatrix === null) {
      distanceMatrix = (dist().distance(distance) as any)(matrix);
    }
    const cluster = (hcluster().linkage(linkage) as any).distanceMatrix(distanceMatrix);
    return orderFull(cluster(matrix));
  }
  optimal_leaf_order.order = orderFull;
  optimal_leaf_order.reorder = optimal_leaf_order;

  optimal_leaf_order.distance = function (x: any ) {
    if (!arguments.length) {
      return distance;
    }
    distance = x;
    distanceMatrix = null;
    return optimal_leaf_order;
  };

  optimal_leaf_order.linkage = function (x: any ) {
    if (!arguments.length) {
      return linkage;
    }
    linkage = x;
    return optimal_leaf_order;
  };

  optimal_leaf_order.distance_matrix = function (x: any ) {
    if (!arguments.length) {
      return distanceMatrix;
    }
    distanceMatrix = x.map((y: any ) => y.slice(0));
    return optimal_leaf_order;
  };
  optimal_leaf_order.distanceMatrix = optimal_leaf_order.distance_matrix; // compatibility

  return optimal_leaf_order;
}
