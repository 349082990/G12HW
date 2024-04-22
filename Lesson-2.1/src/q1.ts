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
      return this.balance;
    } else {
      throw new Error(
        "The amount of money you are trying to deposit is invalid"
      );
    }
  }

  public withdraw(withdrawalAmount: number) {
    if (withdrawalAmount <= this.balance) {
      this.balance -= withdrawalAmount;
      return this.balance;
    } else {
      throw new Error(
        "The amount of money you are trying to withdraw is invalid"
      );
    }
  }

  static getAccounts(accounts: BankAccount[]): string {
    const NUM_ACCOUNTS: number = accounts.length;
    for (let i = 0; i < NUM_ACCOUNTS; i++) {
      const CUR_BANK_ACCOUNT: BankAccount = accounts[i];
      return (
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

const ACCOUNT_ONE: BankAccount = new BankAccount("Peter", "Parker", 300);

const ACCOUNT_TWO: BankAccount = new BankAccount("Steve", "Rogers", 20000);

const ACCOUNT_THREE: BankAccount = new BankAccount(
  "Tony",
  "Stark",
  10000000000000000
);

console.log(ACCOUNT_THREE.withdraw(999999));
console.log(ACCOUNT_TWO.deposit(500));

console.log(BankAccount.getAccounts([ACCOUNT_ONE, ACCOUNT_TWO, ACCOUNT_THREE]));
