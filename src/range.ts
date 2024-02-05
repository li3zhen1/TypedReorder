

export function range(stop: number): number[]; // overload signature
export function range(start: number, stop: number): number[];
export function range(start: number, stop: number, step: number): number[];

export function range(start: number, stop: number = start, step: number = 1): number[] {
    if (arguments.length < 2) {
        stop = start;
        start = 0;
    }
    const range = [];
    let i = start;
    if (step < 0) {
        for (; i > stop; i += step) {
            range.push(i);
        }
    } else {
        for (; i < stop; i += step) {
            range.push(i);
        }
    }
    return range;
}

