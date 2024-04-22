// function reverse<T>(arr: T[]): T[] {
//     const r: T[] = [];
//     for(let i = arr.length -1; i >= 0; i--) {
//         r.push(arr[i]);
//     }
//     return r;
// }

// console.log(reverse([6,7,8]));  // Expect [8,7,6]
// console.log(reverse([123,234535,43534,123123,133]));

function reverse<T>(arr: T[]): T[] {
    for (let i = 0; i < arr.length / 2; i++) {
        const temp = arr[i];
        arr[i] = arr[arr.length - 1 - i];
        arr[arr.length - 1 - i] = temp;
    }
    return arr;
}

console.log(reverse([1,2,3,4,5]));  // Expect [5,4,3,2,1]