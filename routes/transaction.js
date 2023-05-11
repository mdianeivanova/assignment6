const express = require('express');
const router = express.Router();
const { Transaction } = require('../TransactionManager');
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: true
  }
});

const TransactionModel = mongoose.model('Transaction', transactionSchema);

router.get('/', async (req, res) => {
  try {
    const transactions = await TransactionModel.find();
    res.json(transactions);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.post('/', async (req, res) => {
  const { date, description, amount, type } = req.body;

  if (!date || !description || !amount || !type) {
    res.status(400).send('Bad request: missing required fields');
    return;
  }

  const newTransaction = new TransactionModel({
    date,
    description,
    amount,
    type
  });

  try {
    const savedTransaction = await newTransaction.save();
    res.json(savedTransaction);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.delete('/:transaction_id', async (req, res) => {
  const transactionId = req.params.transaction_id;

  try {
    const deletedTransaction = await TransactionModel.findByIdAndDelete(transactionId);
    if (deletedTransaction) {
      res.status(204).send();
    } else {
      res.status(404).send('Transaction not found');
    }
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
