function isAFactor(a: number, b: number): boolean {
    // Modulo % - This gives you the remainder of a division
    if(a%b === 0){
        return true;
    }else{
        return false;
    }
}

console.log(isAFactor(4,2));