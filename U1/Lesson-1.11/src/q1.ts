function validPerfectSq(num: number): boolean {
    // Set lower number to 1 and higher number to the input
    let low: number = 1;
    let high: number = num; 

    // While the lower number is less than the higher number, we take the average and square it
    while (low <= high) {
        let mid: number = Math.floor((low + high) / 2);
        const square: number = mid * mid; 

        // If square is equal to inputted number, then it is a perfect square
        if (square === num) {
            return true;
        }

        // If square is less than the inputted number, then that means that it is in the second half of the tree. Thus, we set low to mid + 1
        if (square < num) {
            low = mid + 1;
        }

        // If square is more than the inputted number, then that means that it is in the first half of the tree. Thus, we set high to mid - 1
        if (square > num) {
            high = mid - 1;
        }
    }

    // Return false if it is not a perfect square
    return false;
}

export { validPerfectSq };