function factors (n: number): number {
    let i = 0;        // pointer
    let counter = 0;
    while(i < n) {
        if (n % i === 0) {
            counter++;
        }
        i++;
    }

    return counter;
}

console.log(factors(15));    // expecting 3