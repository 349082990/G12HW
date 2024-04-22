function recurse(n: number, x: number): number {
    // Base case. Return one if the exponent is 0
    if (x === 0) {
        return 1;
    }

    // Using the property n^x = n * n^x-1
    return n * recurse(n, x - 1);
}

console.log(recurse(5,2));
console.log(recurse(10,10));
console.log(recurse(2,0));