import { SLinkedList } from "./DONT_TOUCH";

function reverse<T>(lst: SLinkedList<T>): SLinkedList<T> {
    let current = lst.head;
    let previous: any = null;
    let next: any = null;

    if (current === null) {
        lst.head = previous;
        return previous;
    }

    
}

export { reverse };