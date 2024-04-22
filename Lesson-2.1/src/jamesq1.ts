class BankAccount {
  constructor(
    public firstName: string,
    public lastName: string,
    public balance: number,
  ) { }


  public deposit(depositAmount: number): void {
    if (depositAmount > 0) {
      this.balance += depositAmount;
      console.log(deposited ${depositAmount} dollars, new balance is ${this.balance} dollars);
    } else if (depositAmount === 0) {
      console.log("cannot deposit 0 dollars");
    } else {
      console.log("cannot deposit negative money");
    }
  }


  public withdraw(withdrawAmount: number): void {
    const NEW_BALANCE: number = this.balance - withdrawAmount;
    if (NEW_BALANCE > 0 && NEW_BALANCE < this.balance) {
      this.balance = NEW_BALANCE;
      console.log(withdrew ${withdrawAmount} dollars, new balance is ${this.balance} dollars);
    } else if (withdrawAmount === 0) {
      console.log(cannot withdraw 0 dollars);
    } else {
      console.log("cannot withdraw a negative amount or more than you have");
    }
  }


  private getFullName(): string {
    return ${this.firstName} ${this.lastName};
  }


  private getBalance(): number {
    return this.balance;
  }


  public static getAccounts(bankAccounts: BankAccount[]): void {
    const NUMBER_OF_ACCOUNTS: number = bankAccounts.length;
    for (let i = 0; i < NUMBER_OF_ACCOUNTS; i++) {
      const BANK_ACCOUNT: BankAccount = bankAccounts[i];
      console.log(
        Account belongs to: ${BANK_ACCOUNT.getFullName()}, 
        balance is ${BANK_ACCOUNT.getBalance()}
      );
    }
  } 
}


const account1: BankAccount = new BankAccount("Peter", "Parker", 300);
const account2: BankAccount = new BankAccount("Steve", "Rogers", 20000);
const account3: BankAccount = new BankAccount("Tony", "Stark", 10000000000000000);

BankAccount.getAccounts([account1, account2])