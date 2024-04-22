class Grades {
  public K: number;
  public T: number;
  public C: number;
  public A: number;

  constructor(K: number, T: number, C: number, A: number) {
    this.K = K;
    this.T = T;
    this.C = C;
    this.A = A;
  }
}

class Weight {
  public K: number;
  public T: number;
  public C: number;
  public A: number;

  constructor(K: number, T: number, C: number, A: number) {
    this.K = K;
    this.T = T;
    this.C = C;
    this.A = A;
  }
}

class Student {
  readonly firstName: string;
  readonly lastName: string;
  private assignmentMark: Grades;

  constructor(firstName: string, lastName: string, assignmentMark: Grades) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.assignmentMark = assignmentMark;
  }

  static maxMark: Grades = new Grades(30, 100, 25, 40);
  static weighting: Weight = new Weight(20, 30, 20, 30);

  public rawAvg(): number {
    if (
      this.assignmentMark.K > Student.maxMark.K ||
      this.assignmentMark.T > Student.maxMark.T ||
      this.assignmentMark.C > Student.maxMark.C ||
      this.assignmentMark.A > Student.maxMark.A
    ) {
      throw new Error("Invalid assignment mark!");
    }
    return (
      ((this.assignmentMark.K / Student.maxMark.K +
        this.assignmentMark.T / Student.maxMark.T +
        this.assignmentMark.C / Student.maxMark.C +
        this.assignmentMark.A / Student.maxMark.A) /
        4) *
      100
    );
  }

  public weightedAvg(): number {
    if (
      this.assignmentMark.K > Student.maxMark.K ||
      this.assignmentMark.T > Student.maxMark.T ||
      this.assignmentMark.C > Student.maxMark.C ||
      this.assignmentMark.A > Student.maxMark.A
    ) {
      throw new Error("Invalid assignment mark!");
    }
    return (
      (((this.assignmentMark.K / Student.maxMark.K) * Student.weighting.K +
        (this.assignmentMark.T / Student.maxMark.T) * Student.weighting.T +
        (this.assignmentMark.C / Student.maxMark.C) * Student.weighting.C +
        (this.assignmentMark.A / Student.maxMark.A) * Student.weighting.A) /
        (Student.weighting.K +
          Student.weighting.T +
          Student.weighting.C +
          Student.weighting.A)) *
      100
    );
  }

  public static classRawAvg(student: Student[]): number {
    const NUM_STUDENTS: number = student.length;
    let sumRawAvg: number = 0;
    for (let i = 0; i < NUM_STUDENTS; i++) {
      sumRawAvg += student[i].rawAvg();
    }
    return sumRawAvg / NUM_STUDENTS;
  }

  public static classWeightedAvg(student: Student[]): number {
    const NUM_STUDENTS: number = student.length;
    let sumWeightedAvg: number = 0;
    for (let i = 0; i < NUM_STUDENTS; i++) {
      sumWeightedAvg += student[i].weightedAvg();
    }
    return sumWeightedAvg / NUM_STUDENTS;
  }
}

const STUDENT_ONE: Student = new Student(
  "Chatty",
  "Katty",
  new Grades(5, 10, 25, 0)
);

const STUDENT_TWO: Student = new Student(
  "Lucky",
  "Roll",
  new Grades(7, 7, 7, 7)
);

const STUDENT_THREE: Student = new Student(
  "Eh-ss",
  "lan-da-ho",
  new Grades(30, 100, 25, 40)
);

const STUDENT_FOUR: Student = new Student(
  "Szo",
  "Klous",
  new Grades(29, 99, 24, 39)
);

const STUDENT_FIVE: Student = new Student(
  "Mi",
  "Dough",
  new Grades(15, 50, 12, 20)
);
