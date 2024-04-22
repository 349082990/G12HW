function sum(n: number): number {
    if (n === 1) {
        return 1;
    }

    else {
        return n + sum(n-1);
    }
}

console.log(sum(5));
console.log(sum(20));

export { sum };