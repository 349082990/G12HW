function sumNumbers(n: number): number {
    return n * (n + 1) / 2;
}

const t0 = performance.now();
console.log(sumNumbers(1000000000)); // Expecting [1]
const t1 = performance.now();
console.log (t1 - t0);
