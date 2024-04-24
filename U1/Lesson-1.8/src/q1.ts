import { SLinkedList } from "./DONT_TOUCH";
function reverse<T>(s: SLinkedList<T>): SLinkedList<T> {
    let current = s.head;
    let previous: any = null;   // Stores the previous node. Initially set to null because first element does not have a previous node
    let next: any = null;       // Stores the next node

    // While next points to the next node of the current node
    while(current !== null) {
        next = current.ref; // Stores next node (current.ref points to location of next node). Remembering which node is "next" in the list. When this loops back next is moved again
        current.ref = previous; // Points current to previous (reverse)
        previous = current; // Move previous to the current node
        current = next; // Moves the current node to the next node
    }
    s.head = previous; // Updates head to previous (first node of reversed list)
    return s.head;

}
    
export { reverse };