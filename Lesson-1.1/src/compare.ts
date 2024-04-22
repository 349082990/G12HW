// function naiveCompare<T>(arr: T[]): T[] {
//     let duplicates: T[] = [];

//     for (let i = 0; i < arr.length; i++) {
//         for (let j = 0; j < arr.length; j++) {
//             if (i !== j && arr[i] === arr [j]) {
//                 duplicates.push(arr[i]);
//             }
//         }
//     }
    
//     return duplicates;
// }

function betterCompare<T>(arr: T[]): T[] {
    let duplicates: T[] = [];
  
    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[i] === arr[j]) {
          duplicates.push(arr[i]);
        }
      }
    }
  
    return duplicates;
  }  

const a = new Array(5000);
a.map((value) => Math.floor(Math.random() * 1000000));  // We're jsut randoming numbers into each element

const t0 = performance.now();
console.log(betterCompare(a)); // Expecting [1]
const t1 = performance.now();
console.log (t1 - t0);