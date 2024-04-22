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

class Course {
    public courseCode: string;
    public courseName: string;
    public studentRoster: Student[] = [];
    
    constructor(courseCode:string, courseName: string) {
        this.courseCode = courseCode;
        this.courseName = courseName;
    }

    addStudent(student: Student) {
        for(let i: number = 0; i < this.studentRoster.length; i++) {
            if (this.studentRoster[i].studentNumber === student.studentNumber) {
                return ("Student is already enrolled");
            }
        }
        this.studentRoster.push(student);
        student.enroll(this.courseCode);
        return ("Student has been enrolled into the course!");
    }

    hasStudent(studentNumber): boolean {
        for (let i: number = 0; i < this.studentRoster.length; i++) {
            if (this.studentRoster[i].studentNumber === studentNumber) {
                return true;
            }
        }
        return false;
    }

    removeStudent(studentNumber): string | void {
        for (let i: number = 0; i < this.studentRoster.length; i++) {
            if (this.studentRoster[i].studentNumber === studentNumber) {
                const REMOVE_STUDENT = this.studentRoster[i];
                for(let j: number = 0; j < REMOVE_STUDENT.enrolledCourses.length; j++) {
                    if(REMOVE_STUDENT.enrolledCourses[j] === this.courseCode) {
                        delete REMOVE_STUDENT.enrolledCourses[j];
                    }
                }
            }
            delete this.studentRoster[i];
            return ("Student has been unenrolled!");
        }
        return ("Student doesn't exist!");
    }

    // O(n), Ω(1)
    listStudents(): string[] {
        const RESULTS: string[] = [];
        for (let i: number = 0; i < this.studentRoster.length; i++) {
            RESULTS.push(this.studentRoster[i].firstName);
        }
        return RESULTS;
    }
}