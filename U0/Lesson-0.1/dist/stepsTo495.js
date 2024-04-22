/**
 *
 * @param n nigger!
 *
 */
function stepsTo495(n) {
    const firstDigit = Math.floor(n / 100);
    const secondDigit = Math.floor((n - firstDigit * 100) / 10);
    const thirdDigit = n % 10;
    let newNumber;
    let counter;
    let greatest;
    let middle;
    let smallest;
    let newFirstDigit;
    let newSecondDigit;
    let newThirdDigit;
    if (firstDigit === secondDigit && firstDigit === thirdDigit) {
        return null;
    }
    while (newNumber != 495) {
        if (newFirstDigit >= newSecondDigit && newFirstDigit >= newThirdDigit) {
            greatest = newFirstDigit;
            if (newSecondDigit >= newThirdDigit) {
                middle = newSecondDigit;
                smallest = newThirdDigit;
            }
            else {
                middle = newThirdDigit;
                smallest = newSecondDigit;
            }
        }
        else if (newSecondDigit >= newFirstDigit && newSecondDigit >= newThirdDigit) {
            greatest = newSecondDigit;
            if (newFirstDigit >= newThirdDigit) {
                middle = newFirstDigit;
                smallest = newThirdDigit;
            }
            else {
                middle = newThirdDigit;
                smallest = newFirstDigit;
            }
        }
        else if (newThirdDigit >= newFirstDigit && newThirdDigit >= newSecondDigit) {
            greatest = newThirdDigit;
            if (newFirstDigit >= newSecondDigit) {
                middle = newFirstDigit;
                smallest = newSecondDigit;
            }
            else {
                middle = newSecondDigit;
                smallest = newFirstDigit;
            }
        }
        let bigger = greatest * 100 + middle * 10 + smallest;
        let smaller = smallest * 100 + middle * 10 + greatest;
        newNumber = bigger - smaller;
        newFirstDigit = Math.floor(newNumber / 100);
        newSecondDigit = Math.floor((newNumber));
        newThirdDigit = newNumber % 10;
        counter++;
    }
    return counter;
}
console.log(stepsTo495(123));
//# sourceMappingURL=stepsTo495.js.map