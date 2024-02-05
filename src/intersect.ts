export function intersect_sorted_ints<T = number>(a: T[], b: T[]) {
  let ai = 0;
  let bi = 0;
  const result = [];

  while (ai < a.length && bi < b.length) {
    if (a[ai] < b[bi]) {
      ai++;
    } else if (a[ai] > b[bi]) {
      bi++;
    } else {
      /* they're equal */
      result.push(ai);
      ai++;
      bi++;
    }
  }

  return result;
}
