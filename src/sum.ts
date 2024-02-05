export function sum(v: number[]): number {
    let i = v.length;
    let s = 0;
    while (i-- > 0) {
      if (!isNaN(v[i])) {
        s += v[i];
      }
    }
    return s;
  }
  