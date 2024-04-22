class Queue<T> {
  public array: T[];
  public front: number = 0;
  public n: number = 0;
  constructor(length: number) {
    this.array = new Array(length);
  }

  public resize(size: number): void {
    const newArray: T[] = new Array(size);
    for (let i = 0; i < this.n; i++) {
      newArray[i] = this.array[(this.front + i) % this.array.length];
    }
    this.front = 0;
    this.array = newArray;
  }

  public enqueue(arg: T) {
    this.array[(this.front + this.n) % this.array.length] = arg;
    this.n++;
    if (this.n + 1 > this.array.length) {
      this.resize(this.array.length * 2);
    }
  }

  public dequeue(): T | undefined {
    const r: T = this.array[this.front];
    delete this.array[this.front];
    this.front = (this.front + 1) % this.array.length;
    this.n--;
    if (this.n < this.array.length / 4) {
      this.resize(this.array.length / 2);
    }
    return r;
  }
}
