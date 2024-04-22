function findMax(arr:number[][]): string {
    let currentMax = arr[0][0];
    let posI = 0;
    let posJ = 0;

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            // When we find something bigger
            if (arr[i][j] >= currentMax) {
                currentMax = arr[i][j];
                posI = i;
                posJ = j;
            }
            console.log(arr[i][j]);
        }
    }

    // return posI + "x" + posJ;
    return `${posI} x ${posJ}`;

}

// console.log(findMax([
//     [1,2,3], 
//     [4,5,6], 
//     [6,8,9],
// ])
// ); // Expecting 2 x 2

console.log(
    findMax([
        [9,2,3],
        [4,5,6],
        [7,8,9],
    ])
);  // Expecting 0 x 0 --> 2 x 2

console.log(
    findMax([
        [9,9],
        [4,5,6],
        [7,8,9],
    ])
);  // Expecting 0 x 0 --. 2 x 2