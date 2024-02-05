import { dot } from './aliases';

export const covariance = dot;

export function covariancetranspose(v: number[][], a: number, b: number) {
  const n = v.length;
  let cov = 0;
  for (let i = 0; i < n; i++) {
    cov += v[i][a] * v[i][b];
  }
  return cov;
}

export function variancecovariance(v: number[][]) {
  const o = v[0].length;
  const cov: number[][] = Array(o);

  for (let i = 0; i < o; i++) {
    cov[i] = Array(o);
  }

  for (let i = 0; i < o; i++) {
    for (let j = i; j < o; j++) {
      cov[i][j] = cov[j][i] = covariancetranspose(v, i, j);
    }
  }

  return cov;
}
