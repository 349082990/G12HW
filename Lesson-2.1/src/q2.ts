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
      (this.assignmentMark.K +
        this.assignmentMark.T +
        this.assignmentMark.C +
        this.assignmentMark.A) /
      4
    );
  }

  public weightedAvg(): number {}
}
