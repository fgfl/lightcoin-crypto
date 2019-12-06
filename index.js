
class Account {
  constructor(username) {
    this.username = username;
    this.transaction = [];
  }

  get balance() {
    if (this.transaction.length > 0) {
      return this.transaction
        .map(trans => trans.value)
        .reduce((p, c) => p + c);
    }
    return 0;
  }

  addTransaction(transaction) {
    this.transaction.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (this.isAllowed()) {
      this.time = new Date();
      this.account.addTransaction(this);
      return true;
    }
    return false;
  }
}

class Withdrawal extends Transaction {
  isAllowed() {
    return this.account.balance - this.amount >= 0;
  }

  get value() {
    return -1 * this.amount;
  }
}

class Deposit extends Transaction {
  isAllowed() {
    return true;
  }

  get value() {
    return this.amount;
  }
}




// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account('snow-patrol');

const t1 = new Withdrawal(50.25, myAccount);
let commitStatus = t1.commit();
console.log('Transaction 1:', t1, commitStatus);

const t2 = new Withdrawal(9.99, myAccount);
commitStatus = t2.commit();
console.log('Transaction 2:', t2, commitStatus);

const t3 = new Deposit(120.00, myAccount);
commitStatus = t3.commit();
console.log('Transaction 3:', t3, commitStatus);

console.log('Balance:', JSON.stringify(myAccount.balance));
