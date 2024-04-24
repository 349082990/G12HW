function naiveCompare(arr) {
    let duplicates = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (i !== j && arr[i] === arr[j]) {
                duplicates.push(arr[i]);
            }
        }
    }
    return duplicates;
}
console.log(naiveCompare([1, 2, 3, 4, 5])); // Expecting [1]
//# sourceMappingURL=compare.js.map