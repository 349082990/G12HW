class Student {
    public firstName: string;
    public lastName: string;
    public studentNumber: number; 
    public birthYear: number;
    public enrolledCourses: string[] = [];

    constructor(firstName: string, lastName: string, studentNumber: number, birthYear: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.studentNumber = studentNumber;
        this.birthYear = birthYear;
    }

    fullName(): string {
        return(this.firstName + " " + this.lastName);
    }

    grade(): number {
        return (this.birthYear / 25);
    }

    // θ(1)
    enroll(courseCode: string): string | void {
        if (this.enrolledCourses.length < 4) {
            this.enrolledCourses.push(courseCode);
            return ("You have enrolled in this course");
        } else {
            return ("You cannot enroll in this course. You have reached the maximum limit!");
        }
    }

    // O(1), Ω(1)
    drop(courseCode: string): string | void{
        for (let i: number = 0; i < this.enrolledCourses.length; i++) {
            if (this.enrolledCourses[i] === courseCode) {
                delete this.enrolledCourses[i];
                return ("You have dropped this course");
            }
        }
        return ("This course does not exist. Please try again!");

    }
}