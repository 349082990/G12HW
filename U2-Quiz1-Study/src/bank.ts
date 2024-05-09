class BankAccount {
  public firstName: string;
  public lastName: string;
  public balance: number;

  constructor(firstName: string, lastName: string, balance: number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.balance = balance;
  }

  public deposit(depositAmount: number) {
    if (this.balance > 0) {
      this.balance += depositAmount;
      return this.balance;
    } else {
      throw new Error("wrong number");
    }
  }

  public withdraw(withdrawalAmount: number) {
    if (withdrawalAmount < this.balance) {
      this.balance -= withdrawalAmount;
      return this.balance;
    } else {
      throw new Error("wrong number");
    }
  }

  static returnInfo(account: BankAccount[]) {
    let infoHolder: string = "";
    for (let i = 0; i < account.length; i++) {
      infoHolder += `account${[i]}: firstName: ${
        account[i].firstName
      } lastName: ${account[i].lastName} balance: ${account[i].balance}
      }`;
    }
    return infoHolder;
  }
}

const account1 = new BankAccount("Peter", "Parker", 300);
console.log(account1);
const account2 = new BankAccount("Steve", "Rogers", 20000);
console.log(account2);
const account3 = new BankAccount("Tony", "Stark", 10000000000000000);
console.log(account3);
