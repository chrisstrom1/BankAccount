'use strict'

class BankAccount {
    constructor(accountNumber,owner){
        this.accountNumber = accountNumber;
        this.owner = owner;
        this.transactions = []
    }

    balance(){
        let sum = 0;
        for (let i = 0; i < this.transactions.length; i++) {
            if (this.transactions[i] && typeof this.transactions[i].amount === 'number') {
                sum += this.transactions[i].amount;
            }
        }
     return sum;
    
}

charge(payee, amt){
    let currentBalance = this.balance();
    if(amt <= currentBalance){
        let chargeTransaction = new Transaction(-amt, payee);
        this.transactions.push(chargeTransaction);
    }
    }


deposit(amt){
    let depositTransaction = new Transaction(amt, 'Deposit');
    this.transactions.push(depositTransaction);
}


}


class Transaction {
    constructor(amount,payee){
        this.amount = amount;
        this.payee = payee;
        this.date = new Date();
    }
}

class SavingsAccount extends BankAccount {
    constructor(accountNumber, owner, interestRate){
        super(accountNumber, owner);
        this.interestRate = interestRate;
    }

    accrueInterest(){
        let currentBalance = this.balance();
        let interestAmt = currentBalance * (1+this.interestRate)
        let interestTransaction = new Transaction(interestAmt, "Interest");
        this.transactions.push(interestTransaction);
    }
}
//test below

if (typeof describe === 'function'){
    const assert = require('assert');

describe("#testing account creation", function(){
 it('should create a new account correctly',function(){
    let acct1 = new BankAccount("xx4432", "James Doe");
    assert.equal(acct1.owner, 'James Doe');
    assert.equal(acct1.accountNumber, 'xx4432');
    assert.equal(acct1.transactions.length, 0);
    assert.equal(acct1.balance(), 0);
 });

});


describe("#testing ====", function(){
    it('should create a new account correctly',function(){
       let acct1 = new BankAccount("xx4432", "James Doe");
       assert.equal(acct1.balance(), 0);
       acct1.deposit(100);
       assert.equal(acct1.balance(), 100);
       acct1.charge('Target', 10)
       assert.equal(acct1.balance(), 90);
    });
   
    it('should not allow charging to overdraft',function(){
        let acct1 = new BankAccount("xx4432", "James Doe");
        assert.equal(acct1.balance(), 0);
        acct1.charge("Target", 30);
        assert.equal(acct1.balance(), 0);
    });
});
it('should allow a refund',function(){
    let acct1 = new BankAccount("xx4432", "James Doe");
    assert.equal(acct1.balance(), 0);
    acct1.charge("Target", -30);
    assert.equal(acct1.balance(), 30);
});

describe("#Testing transaction creation", function(){
    it('Should create a transation correctly for deposit', function(){
     let t1 = new Transaction(30, "Deposit");
     assert.equal(t1.amount, 30);
     assert.equal(t1.payee, "Deposit");
     assert.notEqual(t1.date, undefined);
     assert.notEqual(t1.date, null);
    });
});

    describe("#Testing transaction creation", function(){
        it('Should create a transation correctly for a charge', function(){
         let t1 = new Transaction(-34.45, "Target");
         assert.equal(t1.amount, -34.45);
         assert.equal(t1.payee, "Target");
         assert.notEqual(t1.date, undefined);
         assert.notEqual(t1.date, null);
        });
    

});

describe("Bunch of transactions and tests", function() {
    let bigAccount = new BankAccount("11223344", "Maggie Smith");

    it("test account created correctly", function() {
        assert.equal("11223344", bigAccount.accountNumber);
        assert.equal("Maggie Smith", bigAccount.owner);
        assert.equal(bigAccount.balance(), 0);
    });

    it("test deposits", function() {
        bigAccount.deposit(30);
        bigAccount.deposit(20);
        bigAccount.deposit(-3);
        bigAccount.deposit(34.25);
        bigAccount.deposit(10000.45);
        assert.equal(10081.70, bigAccount.balance());
        bigAccount.charge("Clearout", 10081.70)
    });
});
}
