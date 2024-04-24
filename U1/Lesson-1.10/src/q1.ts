function bubbleSort<T>(a: T[]): T[] {
    let n: any = a.length;  // N representing the length of the array
    for (let i = 0; i < n - 1; i++) {   // Loop through the array for its length
        for (let j = 0; j < n - 1 - i; j++) {    // n-1-i to avoid making comparisons that have already been made
            if (a[j] > a[j+1]) {                    // If the current element is greater than the next element, swap them
                [a[j], a[j+1]] = [a[j+1], a[j]];
            }
        }
    }
    return a; // Return the array
}

function selectionSort<T>(a: T[]): T[] {
    let n: any = a.length;                  
    for (let i = 0; i < n - 1; i++) {   // Loop through the entire array (It takes n-1 passes to sort an array of n elements)
        let max = 0;    // Save max to 0 (first index)
        for (let j = 0; j < n - i; j++){    // We use n-i loop through elements that have not already been sorted. n-1-i was used in bubble sort to avoid stopping at the end of the array
            if (a[j] > a[max]) {  
                max = j;
            }
        }
        [a[max], a[n-1-i]] = [a[n-1-i], a[max]];
    }
    return a;
}

// fuck it ask james idk how this works!
function insertionSort<T>(a: T[]): T[] {
    let n: any = a.length;
    let i = 1; 
    let x;          // Variable used to store the element currently being sorted into the correct position within 
    let j;
    while (i < n) {
        x = a[i];
        j = i;
        
        while (j > 0 && a[j-1] > x) {
            a[j] = a[j-1];
            j = j - 1;
        }
        a[j] = x;
        i = i + 1
    }
    return a;
}

console.log(insertionSort([5,3,1,4,6]));

export { bubbleSort, selectionSort, insertionSort };