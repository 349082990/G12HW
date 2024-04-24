/**
 * A singly linked list class. Stores values using nodes from the LinearNode class.
 * @property length: The length of the linked list.
 * @property head: The head node. Null if empty.
 * @property tail: The tail node. Null if empty.
 */
class SLinkedList<T> {
    public length: number;
    public head: LinearNode<T> | null;
    public tail: LinearNode<T> | null;
    constructor() {
      this.length = 0;
      this.head = null;
      this.tail = null;
    }
  
    /**
     * Searches through the linked list the see if a value exists in the list. Returns the first index that contains the value if found. Returns false otherwise.
     * @param value: The value to be searched.
     */
    public search(value: T): number | boolean {
      let node: LinearNode<T> | null = this.head;
      let count: number = 0;
  
      while (node !== null) {
        if (node.value === value) {
          return count;
        }
        node = node.ref;
        count++;
      }
  
      return false;
    }
  
    /**
     * Returns the node at a given index in the linked list. Returns null if the node doesn't exist.
     * @param index: The index to be searched.
     */
    public getNode(index: number): LinearNode<T> | null {
      let node: LinearNode<T> | null = this.head; //Start searching from the head
  
      //Returns null if i exceeds the length or is below zero
      if (index > this.length - 1 || index < 0) {
        console.error("Index error.");
        return null;
      }
  
      //Loop through the list
      for (let i = 0; i < index; i++) {
        node = node.ref;
      }
  
      return node;
    }
  
    /**
     * Adds a node at the head of the linked list.
     * @param value: The value for the new head node.
     */
    public addAtHead(value: T): void {
      let newNode: LinearNode<T> | null = null;
  
      if (this.head === null) {
        //If there's no head, make it the head
        newNode = new LinearNode(value, null);
        this.tail = newNode;
      } else {
        //If there is no tail, the prev head becomes the tail
        if (this.tail === null) {
          this.tail = this.head;
        }
        newNode = new LinearNode(value, this.head);
      }
  
      this.head = newNode;
      this.length++;
    }
  
    /**
     * Removes the current head node and returns the value of the node.
     */
    public removeAtHead(): void | T {
      if (this.head !== null) {
        const value = this.head.value;
  
        this.head = this.head.ref;
        this.length--;
  
        return value;
      }
    }
  
    /**
     * Adds a node to the tail of the linked list.
     * @param value: The value of for the new tail node.
     */
    public addAtTail(value: T): void {
      const newNode = new LinearNode(value, null);
  
      if (this.tail === null) {
        //If there's no tail, make it the tail
        this.tail = newNode;
      } else {
        //If there is a tail, attach the prev tail to
        this.tail.ref = newNode;
        this.tail = newNode;
      }
      this.length++;
    }
  
    /**
     * Removes the current tail node and returns the value of the removed node.
     */
    public removeAtTail(): void | T {
      if (this.tail) {
        let prevNode: LinearNode<T> | null = this.getNode(this.length - 2); //-1 would be the tail, -2 is second last
  
        if (prevNode !== null) {
          prevNode.ref = null;
          const value: T = this.tail.value;
  
          this.tail = prevNode;
          return value;
        }
      }
    }
  
    /**
     * Adds a node at a specific index in the linked list. The new node will replace the original node at that index.
     * @param index: the index to be inserted at
     * @param value: the value of the new node
     */
    public addNode(index: number, value: T): void | null {
      if (index < 0 || index > this.length) {
        console.error("Index error.");
        return null;
      } else if (index === 0) {
        this.addAtHead(value);
      } else if (index === this.length) {
        this.addAtTail(value);
      } else {
        let prevNode: LinearNode<T> | null = this.getNode(i - 1);
  
        if (prevNode !== null) {
          const newNode: LinearNode<T> = new LinearNode(value, prevNode.ref);
          prevNode.ref = newNode;
          this.length++;
        }
      }
    }
  
    /**
     * Deletes the node at a given index and returns its value.
     * @param index: The index to delete at.
     */
    public removeNode(index: number): T | void | null {
      if (index < 0 || index > this.length) {
        console.error("Index error.");
        return null;
      } else if (index === this.length - 1) {
        return this.removeAtTail();
      } else if (index === 0) {
        return this.removeAtHead();
      } else {
        //Find the node to be deleted. Stated as LinearNode to prevent type checks for null. Won't null since that would mean its the head node.
        let prevNode = this.getNode(index - 1) as LinearNode<T>;
  
        let toDelete = prevNode.ref as LinearNode<T>;
        let nextNode = toDelete.ref as LinearNode<T>;
  
        prevNode.ref = nextNode;
        this.length--;
  
        return toDelete.value;
      }
    }
    
    /**
     * Replace the value of a node at a specific index.
     * @param index: The index of the node to change value
     * @param value: The new value
     */
    public setNode(index: number, value: T): void | null {
      if (index < 0 || index > this.length) {
        console.error("Index error.");
        return null;
      } else {
        let node = this.getNode(index) as LinearNode<T>;
        node.value = value;
      }
    }
}