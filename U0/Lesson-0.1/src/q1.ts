/**
 * 
 * @param n has to be a number greater than 0
 */
function inchesToCM(n: number): number{
    const conversionRatio = 2.54
    return n * conversionRatio;
}

console.log(inchesToCM(1));