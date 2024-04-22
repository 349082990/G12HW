function isPrime(n: number): boolean {
    function checkPrime(num: number, divisor: number) {
        if (divisor === 1) {
            return true;
        }

        if (num % divisor === 0) {
            return false;
        }

        return checkPrime(num, divisor - 1)
    }

    if (n < 2) {
        return false; // Edge case
    }

    return checkPrime(n, n-1);
}

console.log(isPrime(0));
console.log(isPrime(1));
console.log(isPrime(2));
console.log(isPrime(10));
console.log(isPrime(2621));
console.log(isPrime(5000));


export { isPrime };