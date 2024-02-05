import { permute } from './permute';

export function stablepermute<T>(list: T[], indexes: number[]): T[] {
  const p = permute(list, indexes);
  if (p[0] > p[p.length - 1]) {
    p.reverse();
  }
  return p;
}
