export type QueueItem<T> = { item: T; next?: QueueItem<T> };

export class Queue<T = number> {

    length: number;
    private first: QueueItem<T>;
    private last: QueueItem<T>;



    constructor() {
      this.length = 0;
    }
  
    push(item: T) {
      const node = { item };
      if (this.last) {
        this.last = this.last.next = node;
      } else {
        this.last = this.first = node;
      }
      this.length++;
    }
  
    shift() {
      const node = this.first;
      if (node) {
        this.first = node.next;
        if (!--this.length) {
          this.last = undefined;
        }
        return node.item;
      }
    }
  
    slice(start = 0, end = Infinity) {
      const output = [];
  
      let i = 0;
      for (let node = this.first; node; node = node.next) {
        if (--end < 0) {
          break;
        } else if (++i > start) {
          output.push(node.item);
        }
      }
      return output;
    }
  }
  