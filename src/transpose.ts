export function transposeSlice(a: number[][], start = 0, end = a[0].length) {
    const m = a.length;
    const n = end;
    const b: number[][] = new Array(end - start);
  
    let i = start - 1;
  
    while (++i < n) {
      b[i] = new Array(m);
      let j = -1;
      while (++j < m) {
        b[i - start][j] = a[j][i];
      }
    }
    return b;
  }
  