class Stack<T> {
  public array: T[];
  public n: number = 0; //The number of items in the stack
  constructor(length: number = 16) {
    this.array = new Array(length);
  }
  //Add to the top of the stack
  public push(arg: T) {
    if (this.n < this.array.length) {
      this.array[this.n] = arg;
      this.n++;
    }
  }
  //Remove the top of the stack
  public pop(): T | null {
    if (this.n > 0) {
      this.n--;
      const r = this.array[this.n];
      delete this.array[this.n];
      return r;
    }

    return null;
  }
  //Looking at the top element of the stack
  public peek(): T {
    return this.array[this.n - 1];
  }
}

const s: Stack<number> = new Stack(10);
s.push(1);
console.log(s.peek());
