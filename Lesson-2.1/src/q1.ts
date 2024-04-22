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
    if (depositAmount > 0) {
      this.balance += depositAmount;
    } else {
      throw new Error(
        "The amount of money you are trying to deposit is invalid"
      );
    }
  }

  public withdraw(withdrawalAmount: number) {
    if (withdrawalAmount <= this.balance) {
      this.balance -= withdrawalAmount;
    } else {
      throw new Error(
        "The amount of money you are trying to withdraw is invalid"
      );
    }
  }

  static getAccounts(accounts: BankAccount[]): void {
    const NUM_ACCOUNTS: number = accounts.length;
    for (let i = 0; i < NUM_ACCOUNTS; i++) {
      const CUR_BANK_ACCOUNT: BankAccount = accounts[i];
      console.log(
        "Full Name: " +
          `${CUR_BANK_ACCOUNT.firstName}` +
          " " +
          `${CUR_BANK_ACCOUNT.lastName}` +
          "\nBalance: " +
          `${CUR_BANK_ACCOUNT.balance}`
      );
    }
  }
}

const ACCOUNT1: BankAccount = new BankAccount("Peter", "Parker", 300);

const ACCOUNT2: BankAccount = new BankAccount("Steve", "Rogers", 20000);

const ACCOUNT3: BankAccount = new BankAccount(
  "Tony",
  "Stark",
  10000000000000000
);
