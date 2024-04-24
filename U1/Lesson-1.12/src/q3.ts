function reverse(a: number[]): number[] {
    function reverseArray(start:number, end: number) {
        if (start >= end) {
            return;
        }

        [a[start], a[end]] = [a[end], a[start]];
        return reverseArray(start + 1, end - 1);    // Moves towards the center
    }

    reverseArray (0, a.length - 1); // Initial call to start off
    return a; // Return the new array
}

console.log(reverse([1, 2, 3]));
console.log(reverse([0, 1, 2, 3]));
console.log(reverse([99, 100, 23, 1, 23, -1, 2544, 12, 3598]));

export { reverse };