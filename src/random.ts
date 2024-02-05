import { permutation } from './permutation';
import { zeroes } from './aliases';

/* Fisher-Yates shuffle.
   See http://bost.ocks.org/mike/shuffle/
 */
export function randomPermute<T>(array: T[], i = 0, j = array.length) {
    let m = j - i;
    while (m > 0) {
        const k = i + Math.floor(Math.random() * m--);
        const t = array[i + m];
        array[i + m] = array[k];
        array[k] = t;
    }
    return array;
}

export function randomPermutation(n: number) {
    return randomPermute(permutation(n));
}

export function random_array(n: number, min?: number, max?: number) {
    const ret = Array(n);
    if (arguments.length == 1) {
        while (n) {
            ret[--n] = Math.random();
        }
    } else if (arguments.length == 2) {
        while (n) {
            ret[--n] = Math.random() * min;
        }
    } else {
        while (n) {
            ret[--n] = min + Math.random() * (max - min);
        }
    }
    return ret;
}

export function random_matrix(p: number, n: number, m?: number, sym?: boolean) {
    if (!m) {
        m = n;
    }
    if (n != m) {
        sym = false;
    } else if (!sym) {
        sym = true;
    }
    const mat = zeroes(n, m);

    if (sym) {
        for (let i = 0; i < n; i++) {
            let cnt = 0;
            for (let j = 0; j < i + 1; j++) {
                if (Math.random() < p) {
                    mat[i][j] = mat[j][i] = 1;
                    cnt++;
                }
            }
            if (cnt === 0) {
                const j = Math.floor((Math.random() * n) / 2);
                mat[i][j] = mat[j][i] = 1;
            }
        }
    } else {
        for (let i = 0; i < n; i++) {
            let cnt = 0;
            for (let j = 0; j < m; j++) {
                if (Math.random() < p) {
                    mat[i][j] = 1;
                    cnt++;
                }
            }
            if (cnt === 0) {
                mat[i][Math.floor(Math.random() * m)] = 1;
            }
        }
    }
    return mat;
}
