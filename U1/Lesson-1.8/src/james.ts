import { SLinkedList } from "./DONT_TOUCH";

function reverse<T>(s: SLinkedList<T>): SLinkedList<T> {
  let current = s.head;
  let previous: any = null;
  let next: any = null;
  while (current != null){
    next = current.ref;
    current.ref = previous;
    previous = current;
    current = next;
  }
  s.head = previous
  return previous;
}

export { reverse };