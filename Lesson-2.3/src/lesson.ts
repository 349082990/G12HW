// /*
// ROUND 1
// Client: I want a system to deal with/record my employee's info

// You: Okay. Make sure you pay me.

// ROUND 2
// Client: .... but my employees have IDs though

// You: Oh, my bad. I will add that now.

// ROUND 3
// Client: How do I differentiate between my part time employees and managers?

// You: Oh WOW, I can definitely think of a way to differentiate way this.

// Senior Eng: .... Can I ask if your employees work at different branches/locations? Will you need to record that?

// Client: Yes, we have multiple locations

// SE: How are your employees paid? Are some of them part time?

// Client: Yes, we have both full time and part time employees

// SE: Do any of your employees manage multiple other employees?

// Client: Yes, managers lead teams of up to 4 others. Directors may lead up to 5 managers.

// */

// const promptSync = require("prompt-sync")({ sigint: true });

// interface EmployeeInfo {
//   readonly firstName: string;
//   readonly lastName: string;
//   readonly ID: number;
// }

// interface LocationInfo {
//   readonly location: string;
// }

// class Manager implements EmployeeInfo, LocationInfo {
//   constructor(
//     readonly firstName: string,
//     readonly lastName: string,
//     readonly ID: number,
//     readonly location: string
//   ) {}
// }

// class Director implements EmployeeInfo {
//   constructor(
//     readonly firstName: string,
//     readonly lastName: string,
//     readonly ID: number
//   ) {}
// }

// //Factory design pattern
// class EmployeeFactory {
//   public static make(type: string) {
//     let fn = promptSync("What is their first name? ");
//     let ln = promptSync("What is their last name? ");
//     let id = promptSync("What is their employee ID? ");
//     switch (type) {
//       case "Manager":
//         let location = promptSync("Where do they work? ");
//         return new Manager(fn, ln, Number(id), location);
//       case "Director":
//         return new Director(fn, ln, Number(id));
//       default:
//         throw new Error("That is not a valid type of Employee!");
//     }
//   }
// }

// class Roster {
//   private _managers: Manager[] = [];
//   private _directors: Director[] = [];

//   constructor() {}

//   public get managers(): Manager[] {
//     return this._managers;
//   }

//   public get directors(): Director[] {
//     return this._directors;
//   }

//   public addEmployee(type: string, employee: any) {
//     switch (type) {
//       case "Manager":
//         this._managers.push(employee);
//         break;
//       case "Director":
//         this._directors.push(employee);
//         break;
//       default:
//         throw new Error("Not a valid type of employee!");
//     }
//   }
// }

// class Client {
//   private roster = new Roster();
//   constructor() {
//     this.addEmployee();
//   }

//   public addEmployee() {
//     while (true) {
//       let type = promptSync("What is the type of employee you want to add? ");

//       let employee = EmployeeFactory.make(type);

//       this.roster.addEmployee(type, employee);
//     }
//   }
// }

// class Driver {
//   private client: Client;
//   constructor() {
//     this.client = new Client();
//   }
// }

// new Driver();
