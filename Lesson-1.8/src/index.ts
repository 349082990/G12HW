class LinearNode<T> {
  public value: T;
  public ref: LinearNode<T> | null;
  constructor(value: T, ref: LinearNode<T> | null) {
    this.value = value;
    this.ref = ref;
  }
}

class SLinkedList<T> {
  public length: number;
  public head: LinearNode<T> | null;
  public tail: LinearNode<T> | null;
  constructor() {
    this.length = 0;
    this.head = null;
    this.tail = null;
  }

  public addToHead(val: T): void {
    let newNode: LinearNode<T> | null = null;

    //If we don't have anything in the list
    if (this.head === null) {
      newNode = new LinearNode(val, null);
      this.head = newNode;
      this.tail = newNode;
    } else {
      //When we already have a head node
      newNode = new LinearNode(val, this.head);
      this.head = newNode;
    }
    this.length++;
  }

  public addToTail(val: T): void {
    const newNode = new LinearNode(val, null);

    if (this.tail === null) {
      //There is currently NO tail (empty list)
      this.tail = newNode;
      this.head = newNode;
    } else {
      this.tail.ref = newNode;
      this.tail = newNode;
    }
    this.length++;
  }

  public removeAtHead(): void | T {
    if (this.head !== null) {
      const value = this.head.value;
      const secondNode = this.head.ref;
      this.head = secondNode;
      if (this.length === 1) {
        this.tail = null;
      }
      this.length--;

      return value;
    }
  }

  public removeAtTail(): void | T {
    if (this.head !== null) {
      if (this.length === 1) {
        const value = this.head.value;
        this.head = null;
        this.tail = null;
        this.length--;
        return value;
      }

      let prevNode: LinearNode<T> | null = null;
      let node = this.head;
      while (node.ref != null) {
        if (node.ref === null) {
          prevNode = node;
        }
        node = node.ref;
      }
      this.length--;
      this.tail = prevNode;
      return node.value;
    }
  }
}
