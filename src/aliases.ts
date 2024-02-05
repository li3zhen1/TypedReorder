// Welford's algorithm.
export function mean(x: number[]): number {
    var n = x.length;
    if (n === 0) return NaN;
    var m = 0,
        i = -1;
    while (++i < n) m += (x[i] - m) / (i + 1);
    return m;
}

export function zeroes(n: number): number[];
export function zeroes(n: number, m: number): number[][];
export function zeroes(n: number, m: number, o: number): number[][][];
export function zeroes(n: number, m: number, o: number, p: number): number[][][][];


/*
 Constructs a multi-dimensional array filled with zeroes.
 */
export function zeroes(n: number, ...args: number[]): any[] {
    var i = -1,
        a = [];
    if (arguments.length === 1) while (++i < n) a[i] = 0;
    else while (++i < n) a[i] = zeroes.apply(this, Array.prototype.slice.call(arguments, 1));
    return a;
}


export function dot(a: number[], b: number[]): number {
    var s = 0,
        i = -1,
        n = Math.min(a.length, b.length);
    while (++i < n) s += a[i] * b[i];
    return s;
}

export function length(p: number[]): number {
    return Math.sqrt(dot(p, p));
}



export function normalize(p: number[]): number[] {
    var _l = length(p);
    return p.map(function (d) {
        return d / _l;
    });
}


export function transpose<T>(a: T[][]): T[][] {
    var m = a.length,
        n = a[0].length,
        i = -1,
        j: number,
        b = new Array(n);
    while (++i < n) {
        b[i] = new Array(m);
        j = -1;
        while (++j < m) b[i][j] = a[j][i];
    }
    return b;
}