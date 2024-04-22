function calPoints(operations: string[]): number {
    class Stack<T>{
        public arr: T[];    // The actual stack
        public n: number;   // Number of elements in the call stack
        constructor (length: number = 16){
            // Defaults the length to 16 if nothing is supplied
            this.arr = new Array(length);
        }

        /*Method to create a new static array and add all of our existing elements
        into it. The parameter size is the size of the new array*/
        public resize(size: number): void {
            const newArray: T[] = new Array(size);
            for (let i = 0; i < this.arr.length; i++) {
                newArray[i] = this.arr[i];
            }
            this.arr = newArray;
        }

        /* Pushes the input element to the top of the stack. Increases the length of the stack
        by one. If the number of elements in the stack exceeds the length of our static array,
        create a new array with double the legnth
        */
        public push(element: T): void {
            if (this.n >= this.arr.length) {
                this.resize(this.arr.length * 2);
            }
            this.arr[this.n] = element; // Push to top of the stack
            this.n++; // Add one to number of elements in call stack
        }

        /* Pops (delete) the element at the top of the stack and returns it. Decreases the length
        of the stack by one. If the number of elements is a quarter of the length of the stack array,
        create a new array with half the length, so we don't waste too much space. */
        public pop(): T {
            this.n--;
            const r = this.arr[this.n]; // The top of the stack
            delete this.arr[this.n];    // Delete the current index of the array (the top of the stack)
            if (this.n < this.arr.length / 4) {
                this.resize(this.arr.length / 2); // New array half of length when quarter
            }
            return r; // Returns the element that was deleted
        }

        // Return the element at the top of the stack without deleting it
        public peek(): T {
            return this.arr[this.n - 1];
        }
    }   

    const RESULTS: Stack<number> = new Stack(operations.length);
    let sum: number = 0; 
    for (let i: number = 0; i < operations.length; i++) {
        const OPERATION = operations[i];
        if (!isNaN(+OPERATION)) {   // If operation is a number
            RESULTS.push(+OPERATION);   // Push the number to stack
            sum += RESULTS.peek();      // Set sum to the top val of stack
        } else {
            if (OPERATION === "C") {
                sum -= RESULTS.pop();   // If operation is "C," subtract val from top of the stack from the sum
            }
            else if(OPERATION === "+") {
                const TEMP = RESULTS.pop(); // Store temp value of top of stack
                const NEW = TEMP + RESULTS.peek(); // Store value of the sum of the old top and new top of stack
                RESULTS.push(TEMP); // Push the value of the top of the stack
                RESULTS.push(NEW);  // Push value of sum
                sum += RESULTS.peek();  // Sum is equal to old top val and new tp[ val (see line 57). Peeking here gives the new top stack val
            }
            else if (OPERATION === "D") {
                RESULTS.push(RESULTS.peek() * 2);
                sum += RESULTS.peek();              //Since this runs when if statement doesnt, set new sum value to top of the stack here
            }
        }
    }
    return sum; // Return the sum
}