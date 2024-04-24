class Teacher {
    firstName: string;
    lastName: string
    constructor(firstName: string, lastName: string) {
    // Properties or attributes
    this.firstName = firstName;
    this.lastName = lastName;
    }

    // Methods
    fullName(s: string): string {
        return this.firstName + " " + this.lastName + " " + s;
    }
}

const mrMa: Teacher = new Teacher("Mike", "Ma");
const mrSo: Teacher = new Teacher("Hayden", "So");

console.log(mrMa.fullName("is a teacher"));