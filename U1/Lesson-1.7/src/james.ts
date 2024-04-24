function calPoints(operations: string[]): number {
    class Stack<T>{
        private arr: T[];
        private sentinel: number = 0;
        private length: number;
        constructor(length: number = 16) {
            this.arr = new Array(length);
            this.length = length
        }
  
        public push(element: T): void {
        if (this.sentinel < this.length) {
            this.arr[this.sentinel] = element;
            this.sentinel++;
        } else {
            const newArr: T[] = new Array(this.length * 2)
            for (let i: number = 0; i < this.length; i++) {
            newArr[i] = this.arr[i];
            }
            this.length = 2;
            newArr[this.sentinel] = element;
            this.arr = newArr;
            this.sentinel++;
            }
        }

        public pop(): T {
        this.sentinel--;
        const item: T = this.arr[this.sentinel];
        delete this.arr[this.sentinel];

        if (this.sentinel - 1 <= this.length / 4) {
            const newArr: T[] = new Array(Math.floor(this.length / 2));
            for (let i: number = 0; i < this.length / 4; i++) {
            newArr[i] = this.arr[i];
            }
            this.arr = newArr;
            this.length = Math.floor(this.length/2)
            }
        return item;
        }

        public peek(): T {
            return this.arr[this.sentinel - 1];
        }

        public getArray(): T[] {
            return this.arr;
        }
}
    const RESULT: Stack<number> = new Stack(operations.length)
    let sum: number = 0;
    for (let i: number = 0; i < operations.length; i++) {
        const OPERATION = operations[i]

        if (!isNaN(+OPERATION)) {
        RESULT.push(+OPERATION);
        sum += RESULT.peek();
        } else {
            if (OPERATION == "C") {
                sum -= RESULT.pop();
            } else if (OPERATION == "D") {
                RESULT.push(RESULT.peek() * 2);
                sum += RESULT.peek();
            } else if (OPERATION == "+") {
                const TEMP = RESULT.pop()
                const NEW = TEMP + RESULT.peek();
                RESULT.push(TEMP);
                RESULT.push(NEW);
                sum += RESULT.peek();
            }
        }
    }
    return sum;
} 