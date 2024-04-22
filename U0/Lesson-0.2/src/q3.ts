function checkerBoard(n: number, m: number): string[][]{
    const arr: string[][] = [];
    for (let i: number = 0; i < n; i++) {
        arr[i] = [];    // Initialize arr[i] as an empty array
        for (let j: number = 0; j < m; j++) {
            if (i % 2 === j % 2) {
                arr[i][j] = ".";
            } else{
                arr[i][j] = "*";
            }
        }
    }
    return arr;
}

console.log(checkerBoard(2,2));
// expecting
// [
//  [".", "*"],
//  ["*", "."],
//  

console.log(checkerBoard(2,9));