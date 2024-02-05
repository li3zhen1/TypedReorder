export function meantranspose(v: number[][], j: number) {
  const n = v.length;
  if (n === 0) {
    return NaN;
  }
  let m = 0;
  let i = -1;

  while (++i < n) {
    m += (v[i][j] - m) / (i + 1);
  }

  return m;
}

export function meancolumns(v: number[][]) : number[] {
  const n = v.length;
  if (n === 0) {
    return NaN as unknown as number[];
  }
  const o = v[0].length;
  const m = v[0].slice(0);
  let i = 0;

  while (++i < n) {
    const row = v[i];
    for (let j = 0; j < o; j++) {
      m[j] += (row[j] - m[j]) / (i + 1);
    }
  }

  return m;
}
