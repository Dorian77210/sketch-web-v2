// ---- Stack API -----//

export interface Stack<T> {
    push(item: T): void;
    pop(): T | undefined;
    peek(): T | undefined;
    size(): number;
    isEmpty(): boolean
    contains(item: T): boolean;
    clear(): void
}
  
export class ArrayStack<T> implements Stack<T> {
    private storage: T[] = [];
  
    constructor(private capacity: number = Infinity) {}
  
    push(item: T): void {
      if (this.size() === this.capacity) {
            throw Error("Stack has reached max capacity, you cannot add more items");
      }
      this.storage.push(item);
    }
  
    pop(): T | undefined {
        return this.storage.pop();
    }
  
    peek(): T | undefined {
        return this.storage[this.size() - 1];
    }
  
    size(): number {
        return this.storage.length;
    }

    isEmpty(): boolean {
        return this.size() == 0;
    }

    contains(item: T): boolean {
        return this.storage.includes(item);
    }

    clear(): void {
        this.storage = [];
    }
}

// ---- Queue API -----//
export interface Queue<T> {
    enqueue(item: T): void;
    dequeue(): T | undefined;
    size(): number;
}
 

export class ArrayQueue<T> implements Queue<T> {
    private storage: T[] = [];
  
    constructor(private capacity: number = Infinity) {}
  
    enqueue(item: T): void {
      if (this.size() === this.capacity) {
        throw Error("Queue has reached max capacity, you cannot add more items");
      }
      this.storage.push(item);
    }
    dequeue(): T | undefined {
      return this.storage.shift();
    }
    size(): number {
      return this.storage.length;
    }
  }

/**
 * @author Dorian TERBAH
 * 
 * List that contains only numbers.
 * 
 * @since 1.0
 */
export class NumberList extends Array<number> {
    constructor() {
        super();
    }
}