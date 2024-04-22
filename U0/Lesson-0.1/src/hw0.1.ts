/**
 * 
 * @param n nigger! nigger! nigger! nigger! nigger! nigger!
 * 
 */
function stepsTo495(n: number): number | null {
    const firstDigit: number = Math.floor(n/100);
    const secondDigit: number =  Math.floor((n - firstDigit * 100)/10);
    const thirdDigit: number = n % 10;

    let newNumber: number;
    let counter: number = 0;

    let greatest: number;
    let middle: number ;
    let smallest: number;

    let newFirstDigit: number = firstDigit;
    let newSecondDigit: number = secondDigit;
    let newThirdDigit: number = thirdDigit;

    if (firstDigit === secondDigit && firstDigit === thirdDigit){
        return null;
    }

    while(newNumber != 495){
        if (newFirstDigit >= newSecondDigit && newFirstDigit >= newThirdDigit){
            greatest = newFirstDigit;
            if(newSecondDigit >= newThirdDigit){
                middle = newSecondDigit;
                smallest = newThirdDigit;
            }else{
                middle = newThirdDigit;
                smallest = newSecondDigit;
            } 
            } else if (newSecondDigit >= newFirstDigit && newSecondDigit >= newThirdDigit){
                greatest = newSecondDigit;
                if (newFirstDigit >= newThirdDigit){
                    middle = newFirstDigit;
                    smallest = newThirdDigit;
                }else{
                    middle = newThirdDigit;
                    smallest = newFirstDigit;
                }
            } else if (newThirdDigit >= newFirstDigit && newThirdDigit >= newSecondDigit){
                greatest = newThirdDigit;
                if (newFirstDigit >= newSecondDigit){
                    middle = newFirstDigit;
                    smallest = newSecondDigit;
                } else{
                    middle = newSecondDigit;
                    smallest = newFirstDigit;
                }
            }
            let bigger: number = greatest*100 + middle * 10 + smallest;
            let smaller: number = smallest * 100 + middle * 10 + greatest;
            newNumber = bigger - smaller;
            newFirstDigit = Math.floor(newNumber/100);
            newSecondDigit = Math.floor((newNumber - newFirstDigit * 100)/10);
            newThirdDigit = newNumber % 10;
            counter++;
    }
    return counter;
}

console.log(stepsTo495(123));