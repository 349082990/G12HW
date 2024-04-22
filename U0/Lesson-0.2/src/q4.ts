function transpose(n: number): number {
    const arr: number[][] = [];
    let row: number = 0;
    let coloumn: number = 0;

    for (let i = 0; i < arr.length; i++) {
        arr[i] = [];

        for (let j = 0; j < arr[i].length; j++) {
            arr[row][j] = arr[row][coloumn + 1];

        }

    }
}