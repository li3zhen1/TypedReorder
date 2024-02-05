import { length, dot } from './aliases';
import { assert } from './debug';
import { random_array } from './random';
import { debug } from './core';

function normalize(v: number[]) {
    const norm = length(v);
    let i = v.length;
    if (norm === 0 || Math.abs(norm - 1) < 1e-9) {
        return 1;
    }
    while (i-- > 0) {
        v[i] /= norm;
    }
    return norm;
}

export function poweriteration(v: number[][], init?: number[], eps?: number) {
    if (!eps) {
        eps = 1e-9;
    }

    const n = v.length;
    let b;
    let tmp: number[] = Array(n);
    let s = 100;

    assert(n == v[0].length, 'poweriteration needs a square matrix');
    if (!init) {
        b = random_array(n);
    } else {
        // copy
        b = init.slice();
    }
    normalize(b);
    while (s-- > 0) {
        for (let i = 0; i < n; i++) {
            tmp[i] = 0;
            for (let j = 0; j < n; j++) {
                tmp[i] += v[i][j] * b[j];
            }
        }
        normalize(tmp);
        if (dot(tmp, b) > 1.0 - eps) {
            break;
        }
        const t = tmp;
        tmp = b;
        b = t; // swap b/tmp
    }
    return tmp;
}

export function poweriteration_n(v: number[][], p: number, init: number[][], start: number, eps: number) {
    if (!eps) {
        eps = 1e-9;
    }

    const n = v.length;
    const b: number[][] = Array(p);
    let tmp: number[] = Array(n);
    let s = 100;
    const eigenvalue: number[] = Array(p);

    assert(n == v[0].length, 'poweriteration needs a square matrix');
    if (!init) {
        for (let i = 0; i < p; i++) {
            const row = (b[i] = random_array(n));
            eigenvalue[i] = normalize(row);
        }
    } else {
        for (let i = 0; i < p; i++) {
            b[i] = init[i].slice(); // copy
            eigenvalue[i] = normalize(b[i]);
        }
    }
    if (!start) {
        start = 0;
    }

    for (let k = start; k < p; k++) {
        let bk = b[k];
        while (s-- > 0) {
            // Orthogonalize vector
            for (let l = 0; l < k; l++) {
                const row = b[l];
                const d = dot(bk, row);
                for (let i = 0; i < n; i++) {
                    bk[i] -= d * row[i];
                }
            }

            for (let i = 0; i < n; i++) {
                tmp[i] = 0;
                for (let j = 0; j < n; j++) {
                    tmp[i] += v[i][j] * bk[j];
                }
            }
            eigenvalue[k] = normalize(tmp);
            if (dot(tmp, bk) > 1 - eps) {
                break;
            }
            bk = tmp;
            tmp = b[k];
            b[k] = bk; // swap b/tmp
        }
        if (debug) {
            console.log('eig[%d]=%j', k, bk);
        }
    }
    return [b, eigenvalue] as const;
}
