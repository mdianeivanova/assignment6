class Transaction {
  constructor(date, description, amount, type) {
    this.date = date;
    this.description = description;
    this.amount = amount;
    this.type = type;
    this.id = Math.floor(Math.random() * 1000);
  }
}
const transactions = [
  new Transaction('2022-01-01', 'Salary', 4000, 'credit'),
  new Transaction('2022-01-09', 'Rent', -580, 'debit'),
  new Transaction('2022-01-15', 'Grocery/ Shopping', -200, 'debit'),
  new Transaction('2022-01-27', 'Gas bill', -50, 'debit'),
  new Transaction('2022-01-30', 'Investment', 1000, 'credit'),
];
function getTransactions() {
  return transactions;
}
function addTransaction(transaction) {
  const newTransaction = new Transaction(
    transaction.date,
    transaction.description,
    transaction.amount,
    transaction.type
  );
  transactions.push(newTransaction);
  return newTransaction;
}
function deleteTransaction(transactionId) {
  const index = transactions.findIndex((t) => t.id == transactionId);
  if (index !== -1) {
    const deletedTransaction = transactions.splice(index, 1);
    return deletedTransaction[0];
  } else {
    return null;
  }
}
module.exports = {
  Transaction,
  getTransactions,
  addTransaction,
  deleteTransaction,
};





