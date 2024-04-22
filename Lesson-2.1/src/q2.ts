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
  public firstName: string;
  public lastName: string;
  public assignmentMark: Grades;

  constructor(firstName: string, lastName: string, assignmentMark: Grades) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.assignmentMark = assignmentMark;
  }

  static maxMark: Grades;
}
