const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = 3000;

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
app.use(bodyParser.json());

const uri = 'mongodb://localhost:27017';
const dbName = 'myDatabase';

const client = new MongoClient(uri);

client.connect((err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Connected to MongoDB server');

  const db = client.db(dbName);
  app.locals.db = db;
});

app.get('/transactions', (req, res) => {
  const db = req.app.locals.db;
  const collection = db.collection('transactions');
  collection.find().toArray((err, transactions) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching transactions from database');
    } else {
      res.status(200).json(transactions);
    }
  });
});

app.post('/transactions', (req, res) => {
  const db = req.app.locals.db;
  const collection = db.collection('transactions');
  const transaction = req.body;

  collection.insertOne(transaction, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error adding transaction to database');
    } else {
      const newTransaction = result.ops[0];
      res.status(201).json(newTransaction);
    }
  });
});

app.delete('/transactions/:transaction_id', (req, res) => {
  const db = req.app.locals.db;
  const collection = db.collection('transactions');
  const transactionId = req.params.transaction_id;

  collection.findOneAndDelete({ _id: ObjectId(transactionId) }, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error deleting transaction from database');
    } else if (result.value) {
      res.status(204).send();
    } else {
      res.status(404).send('Transaction not found');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
