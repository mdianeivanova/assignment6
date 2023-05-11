const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, required: true },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

mongoose.connect('mongodb://localhost:27017/titan', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function getTransactions() {
  const transactions = await Transaction.find();
  return transactions;
}

async function addTransaction(transaction) {
  const newTransaction = new Transaction(transaction);
  await newTransaction.save();
  return newTransaction;
}

async function deleteTransaction(transactionId) {
  const deletedTransaction = await Transaction.findByIdAndDelete(transactionId);
  return deletedTransaction;
}

module.exports = {
  Transaction,
  getTransactions,
  addTransaction,
  deleteTransaction,
};
