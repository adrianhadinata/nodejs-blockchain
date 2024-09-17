let hash = require("object-hash");
let validator = require("../helpers/validator");
let mongoose = require("mongoose");

const TARGET_HASH = hash(1000);
const blockChainModel = require("../models/blockChainModel");

class BlockChain {
  constructor() {
    // Create new chain
    this.chain = [];

    // Transactions
    this.current_transaction = [];
  }

  // Create new block
  addNewBlock(previousHash) {
    let block = {
      index: this.chain.length + 1,
      timestamp: Date.now(),
      transactions: this.current_transaction,
      previousHash: previousHash,
    };

    let proof = validator.proofOfWork();

    if (proof == TARGET_HASH) {
      console.log("Adding new block to chain...");
      block.hash = hash(block);

      // Add it to new instance, save it on the DB, then console success
      let newBlock = new blockChainModel(block);

      newBlock
        .save()
        .then((doc) => {
          console.log("Data successfully saved:", doc);
        })
        .catch((error) => {
          console.error("Error saving data:", error);
        });

      // Add to chain
      this.chain.push(block);
      this.current_transaction = [];

      return block;
    }
  }

  // Create new transaction
  addNewTransaction(sender, recipient, amount) {
    this.current_transaction.push({
      sender: sender,
      recipient: recipient,
      amount: amount,
    });
  }

  // Get last block on chain
  getLastBlock() {
    let previousHash = blockChainModel
      .findOne(undefined, undefined, { sort: { _id: -1 } })
      .exec();
    return previousHash;
  }

  // Is block empty?
  isEmpty() {
    return this.chain.length === 0;
  }
}

module.exports = BlockChain;
