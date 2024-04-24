/**
 * The class for a queue ADT. This version uses a generic to be statically typed. It can be removed if a dynamic version is needed. It uses a static array.
 * @public array: The actual queue
 * @public front: The index of the front of the queue
 * @public n: The number of elements in the queue
 */
class CircularQueue<T> {
    public array: T[];
    public front: number = 0;
    public n: number = 0;
    constructor(length: number = 16) {
      //Defaults the array to length 16 if not provided a length
      this.array = new Array(length);
    }
  
    /**
     * Helper method to resize the current array to the set size. All elements will be placed at the front of the array and "front" will be reset to zero.
     * @param size: the size the new array will be
     */
    public resize(size: number): void {
        const newArray: T[] = new Array(size);     // Create new array
        for (let i = 0; i < this.n; i++) {         // loop through the array
          newArray[i] = this.array[(this.front + i) % this.array.length];       // 
        }
        this.front = 0;
        this.array = newArray;
    }    

      /**
   * Adds the input element to the back of the queue. First the size of the queue will checked. If the queue is too short, it will be first resized before enqueuing the element.
   * @param value: The element to be added.
   */
    public enqueue(value: T): void {
        if (this.n + 1 > this.array.length) {
        this.resize(this.array.length * 2);
        }

        this.array[(this.front + this.n) % this.array.length] = value;
        this.n++;
    }

    /**
     * Removes the element at the front of queue and returns it. Doing is will change the value of front, effectively "shifting it forward" by one.
     */
    public dequeue(): T {
        const r = this.array[this.front];
        delete this.array[this.front];
        this.front = (this.front + 1) % this.array.length;
        this.n--;
        if (this.n < this.array.length / 4) {
        this.resize(this.array.length / 2);
        }
        //We can also choose to decrease the length of array to save space here
        return r;
    }

    /**
     * Returns the element at the front of the queue without removing it.
     */
    public peek(): T {
        return this.array[this.front];
    }

    /**
     * Searches through the queue to see if the input element exists in the queue.
     * @param arg: The element to search for.
     */
    public contains(arg: T): boolean {
        for(let i = 0; i < this.array.length;i++){
        if(this.array[i] === arg) {
            return true;
        }
        }

        return false;
    }
}