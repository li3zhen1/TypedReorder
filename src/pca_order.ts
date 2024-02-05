import { meancolumns } from './mean';
import { variancecovariance } from './covariance';
import { poweriteration } from './poweriteration';
import { sort_order } from './sort_order';

// Takes a matrix, substract the mean of each row
// so that the mean is 0
function center(v: number[][]) {
  const n = v.length;

  if (n === 0) {
    return null;
  }

  const mean = meancolumns(v);
  const o = mean.length;
  const v1 = Array(n);

  for (let i = 0; i < n; i++) {
    const row = v[i].slice(0);
    for (let j = 0; j < o; j++) {
      row[j] -= mean[j];
    }
    v1[i] = row;
  }
  return v1;
}

// See http://en.wikipedia.org/wiki/Power_iteration
export function pca1d(v: number[][], eps: number) {
  if (v.length === 0) {
    return null;
  }

  v = center(v);
  const cov = variancecovariance(v);
  return poweriteration(cov, undefined, eps);
}

export function pca_order(v: number[][], eps: number) {
  return sort_order(pca1d(v, eps));
}
