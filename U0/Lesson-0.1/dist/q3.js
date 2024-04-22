function grades(n) {
    let finalGrade = "";
    if (n <= 59) {
        finalGrade = "F";
    }
    else if (n <= 69) {
        finalGrade = "D";
    }
    else if (n <= 79) {
        finalGrade = "C";
    }
    else if (n <= 89) {
        finalGrade = "B";
    }
    else if (n <= 99) {
        finalGrade = "A";
    }
    else if (n === 100) {
        finalGrade = "A+";
    }
    else {
        throw new Error("You put in an invalid grade!");
    }
    // If your grade is between D and A, not A+
    if (n >= 60 && n <= 99) {
        if (n % 10 >= 2) {
            finalGrade += "-";
        }
        else if (n % 10 >= 7) {
            finalGrade += "+";
        }
    }
    return finalGrade;
}
console.log(grades(89));
console.log(grades(100));
console.log(grades(45));
console.log(grades(200));
//# sourceMappingURL=q3.js.map