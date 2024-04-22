class Stack<T> {
    public array: T[];  // Defining array of any type
    public n: number = 0;   // Defining number of elements in the stack
    
    constructor (length: number = 16) {
        this.array = new Array(length);     // Creating array length of 16
    }

    // Resize stack if too short or too big compared to the LENGTH
    public resize (size:number): void {
        const newArray: T[] = new Array(size);  // Make new array with size @param
        for (let i = 0; i < this.array.length; i++) {   // Set every index of old array equal to the new array
            newArray[i] = this.array[i];
        }
        this.array = newArray;  // Settig new array to old array
    }

    // Push new element of array
    public push(arg: T) : void {
        if(this.n >= this.array.length) {       // If the number of elemnents in the stack is greater than or equal to the legnth of the array, then resize the array by multiplying its length by 2
            this.resize(this.array.length * 2);
        }
        this.array[this.n] = arg;               // set the new element into the array
        this.n++;                               // Increase the number of elements by 1, since you just pushed an element
    }

    // Pop (delete) an element from the array
    public pop(): T {
        this.n--;                               // Decrease the number of elements by one
        const r = this.array[this.n] ;          // Saving r as a temp value (index of array).
        delete this.array[this.n];              // Deleting the element from the array
        if (this.n <= this.array.length / 4) {  // If the number of elements is less a quarter of the array length (memorize this number)
            this.resize(this.array.length / 2); // Resize the length of the array to half (memorize this number)
        }
        return r;                               // Return the value
    }
}