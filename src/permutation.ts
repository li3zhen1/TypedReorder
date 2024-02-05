import { range } from './range';

export const permutation = range;

// function inverse_permutation(perm: number[], dense: boolean = false) {
//     const inv = dense ? Array(perm.length) : {};
//     for (let i = 0; i < perm.length; i++) {
//         inv[perm[i]] = i;
//     }
//     return inv;
// }

// // Overload signatures
// export function inverse_permutation(perm: number[], dense: false): { [key: number]: number };
// export function inverse_permutation(perm: number[], dense: true): number[];
// export function inverse_permutation(perm: number[]): { [key: number]: number };

// Implementation
export function inverse_permutation<T>(perm: T[], dense: boolean = false): T[] {
    const inv: any = dense ? Array(perm.length) : {};
    for (let i = 0; i < perm.length; i++) {
        inv[perm[i]] = i;
    }
    return inv;
}