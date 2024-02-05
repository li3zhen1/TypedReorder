export type QueueItem<T> = {
    item: T;
    next?: QueueItem<T>;
};
export declare class Queue<T = number> {
    length: number;
    private first;
    private last;
    constructor();
    push(item: T): void;
    shift(): T;
    slice(start?: number, end?: number): T[];
}
//# sourceMappingURL=queue.d.ts.map