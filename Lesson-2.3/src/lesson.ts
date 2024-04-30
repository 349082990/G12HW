/*
Client: I want a system to deal with/recorod my employees info

You: Okay. Make sure you pay me.

ROUND 2
Client: but my employees have IDs though

You: Oh, my bad. I will add that for now.

ROUND 3
Client: How do I differentiate between my part time employees and managers?

You: Oh WOW. I can deifnitely think of a way to differentiate this

Senio Eng:... Can I ask if your employee works at different branches/locations?
Will you need to record that?

Client: Yes, we have multiple locations

SE: How are your employees paid? Are some of them part time?

Client: Yes, we have bot full-time and part-time employees

SE: Do any of your employees manage multiple other employees?

Client: Yes, managers lead teams of up to 4 others. Directors may lead up to 5 managers.

*/
const promptSync = require("prompt-sync")({ sigint: true });

interface EmployeeInfo {
  readonly firstName: string;
  readonly lastName: string;
  readonly id: number;
}

interface LocationInfo {
  readonly location: string;
}

class Manager implements EmployeeInfo, LocationInfo {
  constructor(
    readonly firstName: string,
    readonly lastName: string,
    readonly id: number,
    readonly location: string
  ) {}
}

class Director implements EmployeeInfo {
  constructor(
    readonly firstName: string,
    readonly lastName: string,
    readonly id: number
  ) {}
}

class EmployeeFactory {
  public static make(type: string) {
    let fn = promptSync("What is your first name? ");
    let ln = promptSync("What is your last name? ");
    let id = promptSync("What is your employee ID? ");
    switch (type) {
      case "Manager":
        let location = promptSync("Where do they work? ");
        return new Manager(fn, ln, Number(id), location);
      case "Director":
        return new Director(fn, ln, Number(id));
      default:
        throw new Error("That is not a valid type of emplyee!!!");
    }
  }
}

class Roster {
  //should have roster class
  private _managers: Manager[] = [];
  private _directors: Director[] = [];

  constructor() {}

  public get managers(): Manager[] {
    return this._managers;
  }

  public get directors(): Director[] {
    return this._directors;
  }
}

class Client {
  private managerRoster: Manager[] = [];
  private directorRoster: Director[] = [];
  constructor() {
    this.addEmployee();
  }

  public addEmployee() {
    while (true) {
      let type = promptSync("What is the type of employee you want to add? ");
      let employee = EmployeeFactory.make(type);
    }
  }
}

class Driver {
  private client: Client;
  constructor() {
    this.client = new Client();
  }
}

new Driver();
