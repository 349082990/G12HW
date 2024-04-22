function blackJack(a: number, b: number): number {
    let sum = a + b;
    if (sum <= 21){
        return sum;
    }
    
    if (a === 11 || b === 11) {
        sum -= 10;
        return sum;
    }
    return 0;
}

console.log(blackJack(1,2));   // Expect a 3
console.log(blackJack(11,3));  // Expect 14
console.log(blackJack(11,13)); // Expect 14